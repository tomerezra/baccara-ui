const Parts = [
    {
        id:1,
        name: "Module",
        value:'module',
        question:'Which module do need?',
        options:[{name:'1-way',value:'GEM-A'}] 
        
    },
    {
        id:2,
        name: "Body",
        value:'body',
        question:'Which body do need?',
        options:[{name:'Aluminium',value:'1'},{name:'Brass', value:'2'},{name:'Stainless Steel',value:'3'}] 
        
    },
    {
        id:3,
        name: "Port",
        value:'port',
        question:'Which port do need?',
        options:[{name:'1/8" BSP',value:'10'},{name:'1/8" NPT', value:'11'},{name:'1/4" BSP', value:'20'},{name:'1/4" NPT', value:'21'}] 
        
    },
    {
        id:4,
        name: "Function",
        value:'function',
        question:'Which function do need?',
        options:[{name:'2W NC',value:'1'},{name:'2W NO',value:'2'},{name:'2WNO through base',value:'2a'},] 
        
    
    },
    {
        id:5,
        name: "Orifice",
        value:'orifice',
        question:'Which orifice do need?',
        options:[{name:'0.8',value:'1'},
        {name:'1.2', value:'2'},
        {name:'1.6', value:'3'},
        {name:'2.0', value:'4'},
        {name:'2.4', value:'5'},
        {name:'3.0', value:'6'},
        {name:'4.0', value:'7'}
    ] 
        
    },
    {
        id:6,
        name: "Seals",
        value:'seals',
        question:'Wich seals do need?',
        options:[{name:'NBR',value:'N'},
                {name:'FPM(Viton®) ', value:'V'},
                {name:'EPDM', value:'E'},
                {name:'FFKM(Kalrez)', value:'K'},
                {name:'PTFE', value:'T'},
                
            ] 
        
    },
    {
        id:7,
        name: "Override",
        value:'override',
        question:'Which override do need?',
        options:[{name:'None',value:'0'},
        {name:'Plastic',value:'1'},
        {name:'Slot',value:'2'},
        {name:'Knob',value:'3'},
    ] 
        
    },
    {
        id:8,
        name: "Voltage",
        value:'voltage',
        question:'Which voltage do need?',
        options:[{name:'No Coil',value:'0'},
                {name:'6', value:'1'},
                {name:'12', value:'2'},
                {name:'24', value:'3'},
                {name:'48', value:'4'},
                {name:'110', value:'5'},
                {name:'120', value:'6'},
                {name:'220', value:'7A'},
                {name:'230', value:'7'},
                {name:'240', value:'8'},
                {name:'Latch/Other', value:'9'}
            ] 
        
    },
    {
        id:9,
        name: "Power",
        value:'power',
        question:'Which power do need?',
        options:[{name:'No coil',value:'0'},
                {name:'AC8W 50Hz', value:'1'},
                {name:'AC8W 60Hz', value:'2'},
                {name:'DC10W', value:'3'},
                {name:'AC5.5W50Hz', value:'4'},
                {name:'AC5.5W60Hz', value:'5'},
                {name:'AC2.5W 50/60Hz', value:'6'},
                {name:'DC5.5W', value:'7'},
                {name:'DC3.5W', value:'8'},

            ] 
        
    },
    {
        id:10,
        name: "Connector",
        value:'connector',
        question:'Which conector do need?',
        options:[{name:'None',value:'0'},
                {name:'with', value:'1'},
                {name:'with LED', value:'2'},
                {name:'with', value:'2'},] 
        
    },
    ]
    
    export default Parts