# JS-Fetch-API
 JS Fetch API implementation (for txt, json and database pull).

## JavaScript
Notice that function call (FetchThis) is promise by itself!!!
Use data inside function to be shure that data has arrived.
> FetchThis("JSON", { FilePath: "./test/valid.json" }).then(response => { // Play with data here...
### Method type
This script uses only **POST** method which covers all possible needs (DELETE and PUT methods are same as POST anyway, POST is also much safer than GET, so it's POST only).
### **JSON** and **TEXT** files
Examples are commented. Uncoment if you want to test it on your site. For testing purposes you have to copy test folder with sample files or adjust example path to correct path of your files on your site.
### **Database queries**
If you don't know yet, all parameters sent through Fetch API must be in JSON format (body item). You can do it by yourself or use mine approach along with database.php.
All example JSON objects are coresponding to PHP sections. PHP is constructed as query builder and it will create all simple queries for you. Just follow rules in examples. All JSON calls are self explanatory and you will never write those simple queries again. Operators between filters are **"AND"** exclusively (didn't I said: simple queries). Maybe in future versions I will expand this functionality. If you have spaces in database table name or field names, put it in square brackets.
## PHP
Change connect_db.php to connect your database. This approach uses **PDO** (*PHP Data Objects*) exclusively. MySQL and MySQLi are not supported. If you are using these methods consider using PDO with parametrized queries. It is much safer.
