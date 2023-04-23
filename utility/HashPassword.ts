import { sha512 } from 'sha512-crypt-ts'; // From https://www.npmjs.com/package/sha512-crypt-ts

// Returns a 16 byte salt
function generate16ByteSalt() {
	const printableCharacters = "!\"#%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~"
	let salt = ""
	
	// Creates the salt
	for(let i = 0; i < 16; i++) {
		const characterIndex = Math.floor(Math.random() * (printableCharacters.length + 1));
		salt = salt + printableCharacters[characterIndex];        
	}

	return salt
}

export function generateHashedPassword(password: string) {
	// Generates a salt
	const salt = generate16ByteSalt();
	
	return sha512.crypt(password, salt);
}