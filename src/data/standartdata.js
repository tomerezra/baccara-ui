const Standart = [
    {
        id:1,
        name: "Module",
        value:'module',
        regex:/gea\W/i,
        question:'Wich module do need?',
        options:[{name:'1-way',value:'GEA'},{name:'2-way', value:'GEA2'}] 
        
    },
    {
        id:2,
        name: "Body",
        value:'body',
        regex:/[1-2]/,
        question:'Wich body do need?',
        options:[{name:'Aluminium',value:'1'},{name:'Brass', value:'2'},{name:'Stainless Steel',value:'3'}] 
        
    },
    {
        id:3,
        name: "Port",
        value:'port',
        regex:/00/,
        question:'Wich port do need?',
        options:[{name:'M5',value:'00'},{name:'#10UNF', value:'01'}] 
        
    },
    {
        id:4,
        name: "Function",
        value:'function',
        regex:/1/,
        question:'Wich function do need?',
        options:[{name:'2W NC',value:'1'}] 
        
    
    },
    {
        id:5,
        name: "Orifice",
        value:'orifice',
        regex:/[1-2]/,
        question:'Wich orifice do need?',
        options:[{name:'0.8',value:'1'},
        {name:'1.0', value:'2'},
        {name:'1.2', value:'3'},
        {name:'1.6', value:'4'},
        {name:'2.0', value:'5'}
    ] 
        
    },
    {
        id:6,
        name: "Seals",
        value:'seals',
        regex:/[N,V]/,
        question:'Wich seals do need?',
        options:[{name:'NBR',value:'N'},
                {name:'FPM V (Viton®)', value:'V'},
                {name:'EPDM', value:'E'}
                
            ] 
        
    },
    {
        id:7,
        name: "Override",
        value:'override',
        regex:/0/,
        question:'Wich override do need?',
        options:[{name:'None',value:'0'}] 
        
    },
    {
        id:8,
        name: "Voltage",
        value:'voltage',
        regex:/[0,2]/,
        question:'Wich voltage do need?',
        options:[{name:'W/out coil',value:'0'},
                {name:'12', value:'2'},
                {name:'24', value:'3'},
                {name:'110', value:'5'},
                {name:'230', value:'7'}] 
        
    },
    {
        id:9,
        name: "Power",
        value:'power',
        regex:/[0,2]/,
        question:'Wich power do need?',
        options:[{name:'No coil',value:'0'},
                {name:'AC 3.6VA(2) 1 50Hz', value:'2'},
                {name:'DC 3W', value:'3'}] 
        
    },
    {
        id:10,
        name: "Connector",
        value:'connector',
        regex:/[0-1]/,
        question:'Wich conector do need?',
        options:[{name:'without',value:'0'},
                {name:'with', value:'1'},{name:'other', value:'3'}] 
        
    },
    ]
    
    export default Standart