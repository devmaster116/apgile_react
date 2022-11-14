const modules =  [
    {
        name: 'Entity',
        component: require('@evenlogics/whf-ra-entity'),
        status: true,
        order: 5
    },
    {
        name: 'Customer',
        component: require('@evenlogics/whf-ra-customer'),
        status: true,
        order: 7
    },
    {
        name: 'User',
        component: require('@evenlogics/whf-ra-user'),
        status: true,
        order: 8
    },

    
];

export default modules;