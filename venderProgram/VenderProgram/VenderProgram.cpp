#include <iostream>
#include <string>
#include <mysql.h>
#include <fstream>
// #include <curl/curl.h>
#include <stdlib.h>
#include <stdio.h>

// #define CURL_STATICLIB

//#pragma comment(lib, "wldap32.lib" )
//#pragma comment(lib, "crypt32.lib" )
//#pragma comment(lib, "Ws2_32.lib")

#define CURL_STATICLIB
#include <curl\curl.h>


using namespace std;

int query_state;
bool debugMode = false;

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
	string imageFileName;
	
	cin.ignore( 10000, '\n' );
	/*
	cout << "Enter Product Name: ";
	getline( cin, productName );
	cout << "Enter Product Price: ";
	cin >> productPrice;
	cin.ignore( 10000, '\n' );
	cout << "Enter Product Description: ";
	getline( cin, productDescription );
	cout << "Enter Product Origin: ";
	getline( cin, productOrigin );
	
	
	cout << "Enter Product Image File Name: ";
	getline( cin, imageFileName );
	
	if ( debugMode ) {
		printf( "\n\nName: %s\nPrice: %f\nManufacturer: %s\nDescription: %s\nOrigin: %s\n\n", productName, productPrice, productManufacturer, productDescription, productOrigin );
	}

	insertQuery( conn, ( string("INSERT INTO products(name, price, manufacturer, description, origin) ") +
						 string( "VALUES('" ) + productName + string( "', " ) + to_string( productPrice ) +
						 string( ", '" ) + productManufacturer + string( "', '" ) + productDescription +
						 string( "', '" ) + productOrigin + string( "')" ) ) );
	cout << "Done Querying Product.\n\n" << endl;
	*/
	//string contents;
	//ifstream in( imageFileName, ios::in | ios::binary );

	//if ( in ) { // Test to make sure in worked and read it into contents
	//	in.seekg( 0, ios::end );
	//	contents.resize( in.tellg() );
	//	in.seekg( 0, ios::beg );
	//	in.read( &contents[ 0 ], contents.size() );
	//	in.close();
	//}

	//CURL* curl;
	//CURLcode responce;

	//struct curl_httppost* formpost = NULL; // HTTP Post
	//struct curl_httppost* lastptr = NULL; // Last Post
	//struct curl_slist* headerlist = NULL;
	//static const char buf[] = "Expect:";

	//curl_global_init( CURL_GLOBAL_ALL );

	//// set up the header
	//curl_formadd( &formpost, &lastptr,
	//			  CURLFORM_COPYNAME, "cache-control:",
	//			  CURLFORM_COPYCONTENTS, "no-cache",
	//			  CURLFORM_END );

	//curl_formadd( &formpost, &lastptr,
	//			  CURLFORM_COPYNAME, "content-type:",
	//			  CURLFORM_COPYCONTENTS, "multipart/form-data",
	//			  CURLFORM_END );

	//curl_formadd( &formpost, &lastptr,
	//			  CURLFORM_COPYNAME, "file",  // <--- the (in this case) wanted file-Tag!
	//			  CURLFORM_BUFFER, "data",
	//			  CURLFORM_BUFFERPTR, contents.data(),
	//			  CURLFORM_BUFFERLENGTH, contents.size(),
	//			  CURLFORM_END );

	//curl = curl_easy_init();

	//headerlist = curl_slist_append( headerlist, buf );
	//if ( curl ) {

	//	curl_easy_setopt( curl, CURLOPT_URL, mysqlServerAddress );

	//	curl_easy_setopt( curl, CURLOPT_HTTPPOST, formpost );

	//	responce = curl_easy_perform( curl );
	//	/* Check for errors */
	//	if ( responce != CURLE_OK ) {
	//		fprintf( stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror( responce ) );
	//	}

	//	curl_easy_cleanup( curl );

	//	curl_formfree( formpost );

	//	curl_slist_free_all( headerlist );
	//}


	const string WEB_SERVER_ADDRESS = "localhost:3000/venderImageUpload";

	CURL* curl;
	CURLcode responce;
	FILE* fd;

	imageFileName = "test.jpeg";
	fd = fopen( imageFileName.c_str(), "rd" );
	if ( !fd ) {
		cout << "Error Reading Image\n" << getenv( "HOME" ) << "\n" << fd << endl;
		return;
	}

	curl = curl_easy_init();

	if ( curl ) {
		// curl_easy_setopt( curl, CURLOPT_URL, "https://api.parse.com/1/files/pic.jpg" );
		curl_easy_setopt( curl, CURLOPT_URL, WEB_SERVER_ADDRESS );

		curl_easy_setopt( curl, CURLOPT_UPLOAD, 1L );

		curl_easy_setopt( curl, CURLOPT_READDATA, fd );

		responce = curl_easy_perform( curl );

		if ( responce != CURLE_OK ) {
			cout << "Failed to upload image.\n"  << curl_easy_strerror( responce ) << endl;
		} else {
			cout << "Image uploaded." << endl;
		}

		curl_easy_cleanup( curl );
		fclose( fd );
	}

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
	
	return 0;
}