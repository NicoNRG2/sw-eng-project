#!/bin/bash

# Variables for certificate details
COUNTRY="IT"
STATE="Italy"
LOCALITY="Trento"
ORGANIZATION="unitn.it"
ORGANIZATIONAL_UNIT="sw-eng-project"
COMMON_NAME="localhost"
EMAIL="email@example.com"

# File names for the key and certificate
KEY_FILE="server.key"
CERT_FILE="server.crt"

# Generate the private key
openssl genrsa -out $KEY_FILE 2048

# Generate a certificate signing request (CSR)
openssl req -new -key $KEY_FILE -out server.csr -subj "/C=$COUNTRY/ST=$STATE/L=$LOCALITY/O=$ORGANIZATION/OU=$ORGANIZATIONAL_UNIT/CN=$COMMON_NAME/emailAddress=$EMAIL"

# Generate the self-signed certificate
openssl x509 -req -days 365 -in server.csr -signkey $KEY_FILE -out $CERT_FILE

# Cleanup the CSR file as it's no longer needed
rm server.csr

echo "Self-signed certificate and key have been generated:"
echo "  Private Key: $KEY_FILE"
echo "  Certificate: $CERT_FILE"
