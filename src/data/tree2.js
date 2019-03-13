const tree2=[
    {
        id:'1',
        value:/gem-a/i,
        parent:null,
        invalid:null
        
    },
    {
        id:'2',
        value:/2|3/,
        parent:/gem-a/i,
        invalid:null
        
        
            
        
    },
    {
        id:'3',
        value:/10|11|20|21/,
        parent:/2/,
        invalid:null
        
    },
    {
        id:'3',
        value:/20|21/,
        parent:/3/,
        invalid:null
        
    },
    {
        id:'4',
        value:/1/,
        parent:/[10,11,20,21]/,
        invalid:/2a/
        
    },
    {
        id:'5',
        value:/3|4|5/,
        parent:/1/, 
        invalid:null
    },
    {
        id:'6',
        value:/N/,
        parent:/3|4|5/, 
        invalid:/k/
    },
    {
        id:'7',
        value:/2/,
        parent:/N/, 
        invalid:null
    },
    {
        id:'8',
        value:/3|5|7/,
        parent:/2/, 
        invalid:/8/
    },
    {
        id:'9',
        value:/1|2|3/,
        parent:/3|5|7/, 
        invalid:null
    },
    {
        id:'10',
        value:/1/,
        parent:/1|2|3/, 
        invalid:null
    },
]


export default tree2