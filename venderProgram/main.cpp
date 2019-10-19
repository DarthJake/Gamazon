#include <iostream>
#include <mysql.h>

using namespace std;

int query_state;

int main() {
    const string host = "localhost";
    const string username = "cppuser";
    const string password = "password2";
    const string db_name = "mydb";
    const int port = 3306;

    MYSQL* conn;
    MYSQL_ROW row;
    MYSQL_RES *res;
    conn = mysql_init(0);

    conn = mysql_real_connect(conn, host.c_str(), username.c_str(), password.c_str(), db_name.c_str(), port, NULL, 0);

    if (conn) {
        puts("Successfully connected to the database.");

        string query = "SELECT * FROM products";
        const char* q = query.c_str();
        query_state = mysql_query(conn, q);

        if (!query_state) {
            res = mysql_store_result(conn);
            while (row = mysql_fetch_row(res)) {
                printf("Product ID: %s\nName: %s\nPrice: %s\nManufacturer: %s\nDescription: %s\nOrigin: %s\n", row[0], row[1], row[2], row[3], row[4], row[5]);
            }
        } else {
            cout << "Query failed: " << mysql_error(conn) << endl;
        }
    } else {
        puts("Connection to the database has failed.");
    }
    return 0;
}