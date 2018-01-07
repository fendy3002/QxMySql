let queryPage = (title = "Query 1") => ({
    sending: false,
    title: title,
    query: "",
    activeResult: 0,
    results: []
});

let openQuery = (connection, databases) => ({
    connection: connection,
    databases: databases,
    activeDatabase: "",
    queries: [queryPage()],
    activeQuery: 0
});

let database = (name) => ({
    name: name,
    expanded: false,
    tables: {
        fetched: false,
        expanded: false,
        data: []
    },
    views: {
        fetched: false,
        expanded: false,
        data: []
    },
    procedures: {
        fetched: false,
        expanded: false,
        data: []
    },
    functions: {
        fetched: false,
        expanded: false,
        data: []
    }
});


export default {
    queryPage,
    openQuery,
    database
};