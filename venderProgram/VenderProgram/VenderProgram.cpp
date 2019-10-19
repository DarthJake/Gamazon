#include <iostream>
#include <string>
#include <mysql.h>

using namespace std;

int query_state;
bool debugMode = true;

MYSQL_ROW selectQuery( MYSQL* conn, string query ) {
	MYSQL_ROW results;
	if ( debugMode ) {
		cout << "Sending query: " << query << endl;
	}
	const char* q = query.c_str();
	query_state = mysql_query( conn, q );

	if ( !query_state ) {
		results = mysql_fetch_row( mysql_store_result( conn ) );
		if ( debugMode ) {
			cout << "Query Sucessful!" << endl;
		}
		return results;
	} else {
		cout << "Error with MYSQL Query..." << endl;
		return false;
	}
}

MYSQL_ROW insertQuery( MYSQL* conn, string query ) {
	MYSQL_ROW results;
	if ( debugMode ) {
		cout << "Sending query: " << query << endl;
	}

	try {
		const char* q = query.c_str();
		query_state = mysql_query( conn, q );

		if ( !query_state ) {
			if ( debugMode ) {
				cout << "Query Sucessful!" << endl;
			}
		} else {
			cout << "Error with MYSQL Query..." << endl;
			return false;
		}
	} catch ( const std::exception& ) {
		cout << "Caught in insert Query!!!!!!!!!!!!!!!!!!!!!!!!!" << endl;
	}
}

bool findUser( MYSQL* conn, string username, string password ) {
	MYSQL_ROW results = selectQuery( conn, "SELECT * FROM venderLogins where name = '" + username + "' and password = '" + password + "'" );
	return results != 0 ? results[ 0 ] > 0 : false; // Find a better solution?
}

void addProduct( MYSQL* conn, string productManufacturer ) {
	string productName;
	double productPrice;
	string productDescription;
	string productOrigin;
	cin.ignore( 10000, '\n' );
	cout << "Enter Product Name: ";
	getline( cin, productName );
	cout << "Enter Product Price: ";
	cin >> productPrice;
	cin.ignore( 10000, '\n' );
	cout << "Enter Product Description: ";
	getline( cin, productDescription );
	cout << "Enter Product Origin: ";
	getline( cin, productOrigin );
	if ( debugMode ) {
		printf( "\n\nName: %s\nPrice: %f\nManufacturer: %s\nDescription: %s\nOrigin: %s\n\n", productName, productPrice, productManufacturer, productDescription, productOrigin );
	}

	insertQuery( conn, ( string("INSERT INTO products(name, price, manufacturer, description, origin) ") +
						 string( "VALUES('" ) + productName + string( "', " ) + to_string( productPrice ) +
						 string( ", '" ) + productManufacturer + string( "', '" ) + productDescription +
						 string( "', '" ) + productOrigin + string( "')" ) ) );

	cout << "Done adding Product.\n\n" << endl;
}

int main() {
	// Setup MYSQL Connection
	const string host = "localhost";
	const string MYSQLUsername = "cppuser";
	const string MYSQLPassword = "password2";
	const string db_name = "mydb";
	const int port = 3306;

	MYSQL* conn;
	conn = mysql_init( 0 );

	conn = mysql_real_connect( conn, host.c_str(), MYSQLUsername.c_str(), MYSQLPassword.c_str(), db_name.c_str(), port, NULL, 0 );

	// User credentials
	string username;
	string password;

	bool loginFlag = false;
	bool quit = false;
	int input;

	// Check MYSQL Connection for user authentication and 
	if ( conn ) {
		puts( "Successfully connected to the database." );
	} else {
		puts( "Connection to the database has failed." );
		return 1;
	}

	// Header
	cout << "Welcome to the Vender Side Program for Gamazon.com\nHere you can add yur products to our website.";
	
	// Get and confirm user login
	do {
		cout << "Please Login:" << endl;
		cout << "\tCompany Name: ";
		getline( cin, username );
		cout << "\tPassword: ";
		getline( cin, password );
		if ( debugMode ) {
			cout << "You entered " << username << " and " << password << endl;
		}

		if ( findUser( conn, username, password ) ) {
			cout << "Found User!" << endl;
			loginFlag = true;
		} else {
			cout << "Incorrect Credentials..." << endl;
		}
	} while ( !loginFlag );
	cin.clear();
	do {
		cout << "Select an operation: " << endl;
		cout << "1. Add a new Product" << endl;
		cout << "2. Quit" << endl;

		cin >> input;
		cin.clear();
		switch ( input ) {
		case(1):
			addProduct(conn, username);
			break;
		case( 2 ):
			quit = true;
			break;
		default:
			cout << "Invalid input. Try again." << endl;
			break;
		}
	} while ( !quit );
		

	cout << "DONE" << endl;

	/*string query = "SELECT * FROM products";
	const char* q = query.c_str();
	query_state = mysql_query(conn, q);

	if (!query_state) {
		res = mysql_store_result(conn);
		while (row = mysql_fetch_row(res)) {
			printf("Product ID: %s\nName: %s\nPrice: %s\nManufacturer: %s\nDescription: %s\nOrigin: %s\n\n", row[0], row[1], row[2], row[3], row[4], row[5]);
		}
	}
	else {
		cout << "Query failed: " << mysql_error(conn) << endl;
	}*/
	
	return 0;
}