export default [
    {
        name: 'Entity',
        component: require('@evenlogics/whf-ra-entity'),
        status: true,
        order: 5
    },
    // {
    //     name: 'Notifier',
    //     component: require('@evenlogics/whf-ra-notifier'),
    //     status: true,
    //     order: 6
    // },
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
    {
        name: 'Persons',
        component: require('../modules/Persons'),
        status: true,
        order: 9
    },
    {
        name: 'Promotion',
        component: require('../modules/UserManagement'),
        status: true,
        order: 12
    },
];