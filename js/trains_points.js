// JavaScript Document

// declare globals
g_gang_l = [ 0, 1, 2];  // no linked lazy points
g_tens_p = [];  // no tens readouts

// init functions

function d_init() {  // Layout 1
g_loco_h = 0;
g_lazy_x = [ 7, 2, 5];
g_lazy_y = [ 1, 1, 1];
g_field = [
    [3221,    ,1322,    ,    ,3221,    ,1322],
    [    ,    ,7213,    ,    ,5132,    ,    ],
    [2213,    ,2132,    ,    ,2213,    ,2132]
];
};

function m_init() {  // Layout 2
g_loco_h = 0;
g_lazy_x = [ 0, 1, 1];
g_lazy_y = [ 4, 1, 5];
g_field = [
    [3221,1322,    ],  
    [    ,7213,1322],  
    [    ,    ,    ],   
    [    ,    ,    ],   
    [    ,    ,    ],  
    [    ,7213,2132],  
    [2213,2132,    ]
];
};

function n_init() {  // Layout 3
g_loco_h = 0;
g_lazy_x = [ 0, 1, 1];
g_lazy_y = [ 3, 1, 5];
g_field = [
    [    ,3221,1322],  
    [3221,5132,    ],   
    [    ,    ,    ],   
    [    ,    ,    ],   
    [    ,    ,    ],   
    [    ,7213,2132],  
    [2213,2132,    ]
];
};

function p_init() {  // Layout 4
g_loco_h = 0;
g_lazy_x = [ 0, 1, 2];
g_lazy_y = [ 5, 1, 4];
g_field = [
	[3221,1322,    ],   
    [    ,7213,1322],    
    [    ,    ,    ],    
    [2213,2132,    ],    
    [3221,    ,5132],  
    [    ,    ,    ],   
    [2213,    ,2132]
];
};

function q_init() {  // Layout 5
g_loco_h = 0;
g_lazy_x = [ 0, 0, 2];
g_lazy_y = [ 5, 2, 4];
g_field = [
	[3221,    ,1322],    
    [    ,    ,    ],  
    [7213,    ,2132],    
    [2213,    ,1322],   
    [3221,    ,5132],  
    [    ,    ,    ],  
    [2213,    ,2132]
];
};