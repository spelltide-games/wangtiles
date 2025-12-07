import re
import os
import urllib.request
import urllib.error
from pathlib import Path

# 配置
MISSING_FILE = "missing.txt"
PUBLIC_PREFIX = "https://spelltide-games.github.io/wangtiles/"
ALTERNATIVE_SOURCE = "https://www.boristhebrave.com/permanent/24/06/cr31/stagecast/"
CURRENT_DIR = Path(__file__).parent

def parse_404_lines(file_path):
    """解析missing.txt文件，提取404的URL"""
    urls = []
    with open(file_path, 'r', encoding='utf-8') as f:
        for line in f:
            # 匹配GET URL 404模式
            match = re.search(r'GET\s+(https://[^\s]+)\s+404', line)
            if match:
                urls.append(match.group(1))
    return urls

def extract_relative_path(url, prefix):
    """从完整URL中提取相对路径"""
    if url.startswith(prefix):
        return url[len(prefix):]
    return None

def download_file(source_url, dest_path):
    """从源URL下载文件到目标路径"""
    # 创建目标目录
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    
    try:
        print(f"正在下载: {source_url}")
        print(f"保存到: {dest_path}")
        
        # 下载文件
        urllib.request.urlretrieve(source_url, dest_path)
        print(f"✓ 成功下载: {dest_path.name}\n")
        return True
    except urllib.error.HTTPError as e:
        print(f"✗ HTTP错误 {e.code}: {source_url}\n")
        return False
    except urllib.error.URLError as e:
        print(f"✗ URL错误: {e.reason}\n")
        return False
    except Exception as e:
        print(f"✗ 下载失败: {str(e)}\n")
        return False

def main():
    print("="*60)
    print("下载缺失的资源文件")
    print("="*60 + "\n")
    
    # 解析missing.txt
    missing_file_path = CURRENT_DIR / MISSING_FILE
    if not missing_file_path.exists():
        print(f"错误: 找不到文件 {MISSING_FILE}")
        return
    
    urls = parse_404_lines(missing_file_path)
    print(f"发现 {len(urls)} 个缺失的文件\n")
    
    success_count = 0
    fail_count = 0
    
    # 处理每个URL
    for url in urls:
        # 提取相对路径
        relative_path = extract_relative_path(url, PUBLIC_PREFIX)
        if not relative_path:
            print(f"警告: 无法解析URL: {url}")
            fail_count += 1
            continue
        
        # 构建源URL（从备用地址下载）
        source_url = ALTERNATIVE_SOURCE + relative_path
        
        # 构建本地目标路径
        dest_path = CURRENT_DIR / relative_path
        
        # 检查文件是否已存在
        if dest_path.exists():
            print(f"文件已存在，跳过: {dest_path}\n")
            continue
        
        # 下载文件
        if download_file(source_url, dest_path):
            success_count += 1
        else:
            fail_count += 1
    
    # 总结
    print("="*60)
    print("下载完成")
    print(f"成功: {success_count} 个文件")
    print(f"失败: {fail_count} 个文件")
    print("="*60)

if __name__ == "__main__":
    main()
