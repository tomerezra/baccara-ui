const Data={
    items:{
        name:'items',
        results:[
            {
                id:'1',
                name: "For Water",
                serial: 'GEA-134a5793',
                standart:'Yes',
                checked:false
            },
            {
                id:'2',
                name: "For Oil",
                serial: 'GEA-134a5793',
                standart:'No',
                checked:false
            },
            {
                id:'3',
                name: "For High Voltage",
                serial: 'GEA-134a5793',
                standart:'Yes',
                checked:false
            },
            {
                id:'4',
                name: "For High Voltage",
                serial: 'GEA-134a5793',
                standart:'Yes',
                checked:false
            
            },
            {
                id:'5',
                name: "For High Voltage",
                serial: 'GEA-134a5793',
                standart:'No',
                checked:false
            }
        ]
    },
    orders:{
        name:'orders',
        results:[
            {
                id:1,
                date: "21/04/2018",
                name: "Israel Israeli",
                items: ['GEA-134a5793','GEA-134a5793'],
                amount: '100',
                value:'200$',
                ordernumber:'1234567',
                status:'Approve'
            
            },
            {
                id:2,
                date: "01/04/2018",
                name: "Jacob Israeli",
                items: ['GEA-134a5793'],
                amount: '2000',
                value:'100000$',
                ordernumber:'1278956',
                status:'Approve'
            
            },
            {
                id:3,
                date: "01/01/2018",
                name: "Moses Levi",
                items: ['GEA-134a5793','GEA-134a5793','GEA-134a5793','GEA-134a5793','GEA-134a5793'],
                amount: '10',
                value:'50$',
                ordernumber:'5837696',
                status:'Approve'
            
            },
            {
                
                id:4,
                date: "15/08/2018",
                name: "Israel Israeli",
                items: ['GEA-134a5793'],
                amount: '100',
                value:'200$',
                ordernumber:'9000578',
                status:'Approve'
            
            },
            {
                
                id:5,
                date: "09/12/2018",
                name: "Israel Israeli",
                items: ['GEA-134a5793'],
                amount: '100',
                value:'1000$',
                ordernumber:'984427',
                status:'Approve'
            
            }
        ]
    },
    shipping:{
        name:'shipping',
        results:[
            {
                id:'1',
                name:'jakov',
                country:'Israel',
                city:'Ashdod',
                address:'יוחנן הצדיק 7',
                checked:false
            },
            {
                id:'2',
                name:'jakov2',
                country:'Israel',
                city:'Ashdod',
                address:'אלחנן הנביא 5',
                checked:false
            },
            {
                id:'3',
                name:'jakov3',
                country:'Israel',
                city:'Ashdod',
                address:'דוד המלך 7',
                checked:false
            },
            {
                id:'4',
                name:'jakov4',
                country:'Israel',
                city:'Ashdod',
                address:'יוחנן הצדיק 7',
                checked:false
            
            },
            {
                id:'5',
                name:'jakov5',
                country:'Israel',
                city:'Ashdod',
                address:'יוחנן הצדיק 7',
                checked:false
            }
        ]
    }
}
export default Data