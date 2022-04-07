// FETCH API -------------------------------------------------------------------
// Pull data from database or text and json files. -----------------------------
// -----------------------------------------------------------------------------

    const HTTPStatus = {
        100: "Continue",
        101: "Switching protocols",
        102: "Processing",
        103: "Early Hints",
        200: "OK",
        201: "Created",
        202: "Accepted",
        203: "Non-Authoritative Information",
        204: "No Content",
        205: "Reset Content",
        206: "Partial Content",
        207: "Multi-Status",
        208: "Already Reported",
        226: "IM Used",
        300: "Multiple Choices",
        301: "Moved Permanently",
        302: "Found (Previously 'Moved Temporarily')",
        303: "See Other",
        304: "Not Modified",
        305: "Use Proxy",
        306: "Switch Proxy",
        307: "Temporary Redirect",
        308: "Permanent Redirect",
        400: "Bad Request",
        401: "Unauthorized",
        402: "Payment Required",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        406: "Not Acceptable",
        407: "Proxy Authentication Required",
        408: "Request Timeout",
        409: "Conflict",
        410: "Gone",
        411: "Length Required",
        412: "Precondition Failed",
        413: "Payload Too Large",
        414: "URI Too Long",
        415: "Unsupported Media Type",
        416: "Range Not Satisfiable",
        417: "Expectation Failed",
        418: "I'm a Teapot",
        421: "Misdirected Request",
        422: "Unprocessable Entity",
        423: "Locked",
        424: "Failed Dependency",
        425: "Too Early",
        426: "Upgrade Required",
        428: "Precondition Required",
        429: "Too Many Requests",
        431: "Request Header Fields Too Large",
        451: "Unavailable For Legal Reasons",
        500: "Internal Server Error",
        501: "Not Implemented",
        502: "Bad Gateway",
        503: "Service Unavailable",
        504: "Gateway Timeout",
        505: "HTTP Version Not Supported",
        506: "Variant Also Negotiates",
        507: "Insufficient Storage",
        508: "Loop Detected",
        510: "Not Extended",
        511: "Network Authentication Required",
        997: "Bad query (no: SELECT, INSERT INTO, UPDATE or DELETE statement)",
        998: "File is corrupted",
        999: "Typeexpression or file path not properly set"
    }

    const FetchThis = (Type, Options) => {

        const Types = ["FILE", "DB", "JSON"],
              SelectedType = Types.indexOf(Type.toUpperCase()),
              FetchObject = {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: { "Content-Type": "application/json; charset=UTF-8" }
            };

        if(SelectedType === 1) {
            Options.FilePath = "./php/database.php";
            FetchObject.body = JSON.stringify(Options);
        }

        return fetch(Options.FilePath, FetchObject)
            .then(FetchResponse => {
                if(FetchResponse.ok) return SelectedType === 0 ? FetchResponse.text() : FetchResponse.json();
                else {
                    let FRS = FetchResponse.status;
                    if(!Options.FilePath || SelectedType === -1) FRS = 999;
                    return {
                        Error: true,
                        QueryType: Type,
                        HTTPStatusCode: FRS,
                        HTTPStatusText: HTTPStatus[FRS]
                    };
                }
            })
            .then(FetchData => { return FetchData; })
            .catch(FetchError => {
                let FES = FetchError.status ? FetchError.status : 998;
                return {
                    Error: true,
                    QueryType: Type,
                    HTTPStatusCode: FES,
                    HTTPStatusText: HTTPStatus[FES]
                };
            });
  
    }

// FETCH API SAMPLES -----------------------------------------------------------

    // FetchThis("FILX", { FilePath: "./test/WrongType.txt" }).then(response => { console.log("Wrong TYPE FILX (console error message is normal):", response); });
    // FetchThis("FILE", { FilePath: "./test/NonExisting.txt" }).then(response => { console.log("NonExisting FILE (console error message is normal):", response); });
    // FetchThis("FILE", { FilePath: "./test/hait.txt" }).then(response => { console.log("Existing FILE:\n" + response); });

    // FetchThis("JSOX", { FilePath: "./test/WrongType.json" }).then(response => { console.log("Wrong TYPE JSOX (console error message is normal):", response); });
    // FetchThis("JSON", { FilePath: "./test/NonExisting.json" }).then(response => { console.log("NonExisting JSON (console error message is normal):", response); });
    // FetchThis("JSON", { FilePath: "./test/invalid.json" }).then(response => { console.log("Invalid JSON (no console error message):", response); });
    // FetchThis("JSON", { FilePath: "./test/valid.json" }).then(response => { console.log("Existing JSON:", response); });

    // Change database access and query parameters.
    // Pay attention to PHP file (database.php). It is SQL query bilder file. Very interesting!!!
    // This fetch api requires database data to be returned as json formatted object!!!!!!!!!!!!!

    /*
    let DBQuery = {
        "SQLCommand": "SELECT",
        "TableName": "_9a_arist",
        "QueryFields": ["ID", "Name"],
        "FilterFields": ["ID", "Group_CHAR"],
        "FilterValues": [31, "G"]
    };
    FetchThis("DB", DBQuery).then(response => { console.log("Database SELECT result:\n", response); });
    */

    /*
    DBQuery = {
        "SQLCommand": "INSERT INTO",
        "TableName": "_9a_arist",
        "InsertFields": ["Name", "Country_ID", "Group_CHAR"],
        "InsertValues": ["Jura jurić", 100, "J"]
    };
    FetchThis("DB", DBQuery).then(response => { console.log("Database INSERT INTO result:", response); });
    */

    /*
    DBQuery = {
        "SQLCommand": "UPDATE",
        "TableName": "_9a_arist",
        "UpdateFields": ["Country_ID"],
        "UpdateValues": [600],
        "FilterFields": ["ID"],
        "FilterValues": [63]
    };
    FetchThis("DB", DBQuery).then(response => { console.log("Database UPDATE result:", response); });
    */

    /*
    DBQuery = {
        "SQLCommand": "DELETE",
        "TableName": "_9a_arist",
        "FilterFields": ["ID"],
        "FilterValues": [63]
    };
    FetchThis("DB", DBQuery).then(response => { console.log("Database DELETE result:", response); });
    */