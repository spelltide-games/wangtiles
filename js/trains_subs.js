// JavaScript Document

// declare globals

// init functions

function s_init() {  // Program Loop
g_loco_h = 1;
g_lazy_x = [ 0];
g_lazy_y = [ 3];
g_gang_l = [ 0];  // no linked lazy points
g_tens_p = [];  // no tens readouts
g_field = [
	[    ,    ,3221,    ,1322,    ,    ,3221,1322],
    [    ,    ,    ,3221,2212,    ,    ,2232,2132],
    [    ,    ,    ,2213,1322,    ,    ,3221,1322],
    [    ,    ,2122,3221,2212,    ,    ,2232,2132],
    [    ,    ,    ,2213,1322,    ,    ,3221,1322],
    [    ,    ,2213,    ,2212,    ,    ,2232,2132]
];
};

function c_init() {  // count up oe
g_loco_h = 3;
g_lazy_x = [17, 3, 8,13];
g_lazy_y = [ 1, 1, 1, 1];
g_gang_l = [ 0, 1, 2, 3];  // no linked lazy points

g_tens_p = [ [15, 2] ];
g_tens_l = [ 0, 1, 1, 1];
g_tens_v = [ 0, 4, 2, 1];

g_field = [
// incrementor
    [    ,    ,3221,1322,    ,    ,    ,3221,1322,    ,    ,    ,3221,1322,    ,    ,    ,    ],
    [    ,    ,    ,7213,    ,    ,1222,2122,7213,    ,    ,1222,2122,7213,    ,    ,    ,2622],
    [2226,    ,2212,2132,    ,    ,2213,2212,2132,    ,    ,2213,2212,2132,    ,    ,    ,    ]
];
};

function a_init() {  // sub select
g_loco_h = 1;
g_lazy_x = [ 0, 3, 0];
g_lazy_y = [ 0, 1, 2];
g_gang_l = [ 0, 1];  // no linked lazy points
g_tens_p = [];  // no tens readouts
g_field = [
    [2226,    ,    ,1322,    ,    ,    ,3221,1322],
    [    ,    ,    ,7213,    ,    ,    ,2232,2132],
    [2226,    ,    ,2132,    ,    ,    ,    ,    ]
];
};