(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v3.4.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2019-05-01T21:04Z
 */
( function( global, factory ) {


	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.4.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code, options ) {
		DOMEval( code, { nonce: options && options.nonce } );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.4
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2019-04-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) &&

				// Support: IE 8 only
				// Exclude object elements
				(nodeType !== 1 || context.nodeName.toLowerCase() !== "object") ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 && rdescend.test( selector ) ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem.namespaceURI,
		docElem = (elem.ownerDocument || elem).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( typeof elem.contentDocument !== "undefined" ) {
			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		console.log("data", data)
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();
						return result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								} );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	// Support: IE 9-11 only
	// Also use offsetWidth/offsetHeight for when box sizing is unreliable
	// We use getClientRects() to check for hidden/disconnected.
	// In those cases, the computed value can be trusted to be border-box
	if ( ( !support.boxSizingReliable() && isBorderBox ||
		val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
					jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url, options ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

},{}],2:[function(require,module,exports){
/*
* Copyright (c) 2018 ALSENET SA
*
* Author(s):
*
*      Luc Deschenaux <luc.deschenaux@freesurf.ch>
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Affero General Public License for more details.
*
*/

'use strict';

var $ = require('jquery');

var worker;

function initWorker() {
  var blob = new Blob([mrz_worker.toString().replace(/^function .+\{?|\}$/g, '')], { type: 'text/javascript' });
  var objectURL = URL.createObjectURL(blob);
  var worker = new Worker(objectURL);

//   worker.addEventListener('error', function (e) {
//     console.log(e);
// 	alert("aasjdfaslkjd")
//     $('html').html(['<pre>', e.message, ' (', e.filename, ':', e.lineno, ':', e.colno, ')</pre>'].join(''));
//   }, false);

  worker.addEventListener('message', function (e) {
    var data = e.data;

    switch (data.type) {
      case 'progress':
        // $('.progress-text').text(data.msg.substr(0, 1).toUpperCase() + data.msg.substr(1));
        break;
      case 'error':
        // $('.progress').removeClass('visible');
        // console.log(data);
        // setTimeout(function () {
        //   window.alert(data.error);
        // }, 100);
		captureAndSendPicutre();
        break;

      case 'result':
        // $('.progress').removeClass('visible');
		showData(data.result)
        // showResult(data.result);
        break;

      default:
        console.log(data);
        break;
    }
  }, false);

  var pathname = document.location.pathname.split('/');
  pathname.pop();
  pathname = pathname.join('/');

  worker.postMessage({
    cmd: 'config',
    config: {
      fsRootUrl: document.location.origin + pathname
    }
  });

  return worker;
	}

	let photo = $('#memberPhoto');
	let name = $('#first_name');
	let surName = $('#last_name');
	let fatherName = $('#father_name');
	let passportNumber = $('#passport_number');
	let birthAddress = $('#birth_address');
	let birthDate = $('#birth_date');
	let registrationAddress = $('#registration_address');
	let givenOrganisation = $('#given_organisation');
	let maritalStatus = $('#marital_status');
	let bloodType = $('#blood_type');
	let height = $('#height');
	let eyeColor = $('#eye_color');
	let givenDate = $('#given_date');
	let expireDate = $('#expire_date');
	let pin = $('#pin');
	let activationDate = $('#activation_date');
	let deactivationReason = $('#deactivation_reason');
	let male = $('#male');
	let female = $('#female');



	function writeDataToForm(data) {

		//console.log(data);
		if (!data?.data?.data?.document?.number) {
			alert("Melumat tapilmadi!");
			return false;
		}

		let document = data.data.data.document;
		let person = data.data.data.person;

		$('label').addClass('active');

		photo[0].src = (person.images[0].image && person.images[0].image != "data:image/jpeg;base64,") ? person.images[0].image : "/static/img/demo_user.webp";
		name.val(person.nameAz);
		surName.val(person.surnameAz);
		fatherName.val(person.patronymicAz);
		passportNumber.val(document.number);
		birthAddress.val(person.birthAddress.city);
		birthDate.val(person.birthDate);
		registrationAddress.val(person.iamasAddress.fullAddress);
		givenOrganisation.val(document.givenOrganization);
		maritalStatus.val(person.maritalStatus.description);
		bloodType.val(person.bloodType.description);
		height.val(person.height);
		eyeColor.val(person.eyeColor.description);
		givenDate.val(document.givenDate);
		expireDate.val(document.expireDate);
		pin.val(person.pin);
		activationDate.val(document.activationDate);
		deactivationReason.val(document.deactivationReason);
		person.gender.label == "MALE" ? male[0].checked = true : female[0].checked = true;

	}


	function getDataFromService(info) {
		return new Promise((resolve, reject) => {
			fetch(`/Home/IdCardByPin?pin=6ktrd86`)
				.then(res => res.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}


function showData(result) {
	if (result.error) {
		captureAndSendPicutre();
	} else {
		let userSeria = result.parsed.fields.documentNumber;
		alert(userSeria);

		let userPin = result.parsed.fields.optional;

		getDataFromService(userSeria).then(data => {
			writeDataToForm(data);
			videoDisplayStatus('none');
		});
    }
	

}

$(document).ready(function () {
  try {
    worker = initWorker();
  } catch (err) {
    $('html').text(err.message);


  }
//   $('#photo').on('change', function (e) {

// 	// console.log("target", e.target.result);
//     // $('#detected, #parsed').empty();
//     //    $('#image').attr('src', '');
//     var reader = new FileReader();
//     reader.onload = function (e) {

// 	// 	console.log("targett", e.target.result)
//     //   //      $('#image').attr('src', e.target.result);
//     //   $('.progress').addClass('visible');
//     //   $('.progress-text').text('Processing...');
//       worker.postMessage({
//         cmd: 'process',
//         image: e.target.result
//       });
//     };
//     if (e.target.files.length) {
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   });
});

	const scanBtn = document.getElementById("sendBlob");

	function mainFunc (img) {
		try {
			worker = initWorker();
		}catch(err) {
			alert("err")
		}
		
		worker.postMessage({
			cmd: 'process',
			image: "data:image/jpeg;base64," + img
		});
		
			// if (e.target.files.length) {
			//   reader.readAsDataURL(e.target.files[0]);
			// }
	}


		const mrzReaderBtn = document.getElementById('mrzreader');
		let canvas = document.getElementById('canvas');
		let context = canvas.getContext('2d');
		let video = document.getElementById('video');
		let videoContainer = document.getElementsByClassName('video-containerr');
		let formPreloader = document.getElementsByClassName('form-preloader');
		let mobileSidebar = document.getElementById('sidebar');
		let idCardBlock = document.getElementById('idCardBlock');
		if (mrzReaderBtn) {
			mrzReaderBtn.addEventListener('click', function () {
				readMrz();
			});
		}
	
		function readMrz() {
			videoDisplayStatus('block');
			
			if (navigator.getUserMedia) {
				navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(stream => {
					video.srcObject = stream;
					video.play();
					setTimeout(function () {
						captureAndSendPicutre();
					})
				}).catch(err => {
					alert("Kamera aktiv deyil!")
				});
			}
		}
	
		function videoDisplayStatus(status) {
			if (status === 'none') {
				videoContainer[0].style.display = 'none';
				video.style.display = 'none';
			} else {
				videoContainer[0].style.display = 'block';
				video.style.display = 'block';
			}
		}
	
		function formLoaderDisplayStatus(status) {
			if (status === 'none') {
				formPreloader[0].classList.add('d-none');
				mobileSidebar.classList.remove('active');
			} else {
				formPreloader[0].classList.remove('d-none');
				mobileSidebar.classList.remove('active');
			}
		}


	
	function captureAndSendPicutre() {
			console.log('worked')
			
			var ratio = video.videoWidth / video.videoHeight;
			var w = video.videoWidth - 100;
			var h = parseInt(w / ratio, 10);
			canvas.width = w;
			canvas.height = h;
			context.fillRect(0, 0, w, h);
			context.drawImage(video, 0, 0, w, h);
			let base64Url = canvas.toDataURL().split(';base64,')[1];
			let replacedUrl = "";
			if (base64Url) {
				replacedUrl = base64Url.replace('data:image/png;base64,', "");
			}

        // let strUrl = "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aXDsk69YSQXBSX1YUQfU1T+oh4YDokx+9TYabVfcWRbdih3ZSQz9+nEc++871xUQ72526x7pjsBTyupJQca/x313364/+abedPouyXFDp092IcQQQcbaZcFsl15cchzpLTS6x146w19/0yzww33nDHG2kuUTcZW0734w65bXQTZWYqmzJIPu307nkIsjPRccNimuzdDVJpydZV2318xz280y971651pADL8htQeTbcx83z82wf4RRYdJtg22CEs76/6itqqnIWXrhh7zbPTfiV0QTwxz43++560x11+2oKvCXmpibQVWeTb4Y1VS9zbQabCHpnzNGCk6x350xzhvIooq2wQfFNAOCxSeZq9/u7iOoqogu6rnotUQfuVetS6ZXyUv1MTXWR/VmovEieA1nt8y7187ty877246ZdSUQvr36eWeyw6m2uqvhqh+8quruDbPruaXXXQVYZX5bXZdeVXRPuqjzDJBw273057/ANOcZY8v+W1wkRLxm3xLIP8AbPz3Dj3rXLbPiOcR6KkJVF9R5Dbv7Hv/ABZdbUdT9luzHJGI34882307x3r83zzVKDG/nNZcaz2+574614z798514mICTjmNWUbbQc24Y/7+8xzbYXdiis+VODpP1/8Ad8ucfusc/cu2R5S2v6F1GHtdtLaZaIcOIOfN/ao1k2LwdJl9G1GmeH8Vkd131u/aIvtHWBLyT6o7BLZhB+LMLNUwb0SbZv2n0u5KbKL45afpMtZ6o7iFl7znJ8XnWmV2PkGWFEHdrz7gZ/8AJc0Agk60IW0Qan3vvVt4CVZyujVN1nPXjT/Rl5tbXjfW4mYfTkglVD3XPjvfXXLff7fXp1IJEzj5Q0AgUgIA4oUstl9xh8qst5K+CxtoS+33P/1dJ/fvnbDkskv/AFQATb7705y9y/yy296/7VQCNdf06nBKJEGDJCAFJGBTZIAMNxLcfH0ZSX45y96+7++7761nKM86tOAa1487978hmju7/v8AefmjDgAzSmFu8fYbq7q46ZqKoZQk3zVIW5ZJsVXGc+//AHb3bDlEgUjjN403PUU4s60EAQkg8JJ44YfbfCyCDSOaiag4cYccIxphV5ZXkr5ubAQ/t1V9Cq37LbTrLv3VNRTq6+IEFbCvaWeqWpRrrCmaOGuaWGKS2nm/bniquj3DDTKY4Anqg/3SjhJViVJYMqPv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";

			if (replacedUrl) {
				mainFunc(replacedUrl)
			} else {
				captureAndSendPicutre();
			}
		}


function showResult(result) {
	console.log("result",result)
  var html;
  var info;
  function escape(t) {
    return t.replace(/</g, '&lt;');
  }

  console.log("parsed result", result.parsed);

  if (result.parsed && result.parsed.modified) {



	console.log("parsed", result.parsed);
    info = result.parsed.modified;
  } else if (result.ocrized) {
    info = result.ocrized;
  } else {
    info = [];
  }
  info = info.join('\n');

  if (result.error) {
    html = ['<div class="error">', escape(result.error), '</div>', '<pre>', escape(info), '</pre>'];
	alert("error occured")
	worker.postMessage({
		cmd: 'process',
		image: "data:image/jpeg;base64,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bBaDNQChskvjjmgnjy0bF6U875wz07w7x+bw4fXcoleQTLn7dQXdaPrPaXURddeMiqv7RF9737004+9376nJdUdeSa3tmS3aeeHBmutthskkgqQcfGskr7897y43x033zw4bJbYcXcaWVUbYRVLppsqssuigotbaQdLgii09137667/763z6/cYdBfaDJXYXVScbsjpiqjmlriHTbXHGBl346wy603ym39280+eZVGHXdaRccQBUW68SBOw7VxVefTcNtr335/4wzx0ILRROPcTDADAHWcbQ2RZbaTbdfQ9XccdfSEBHNH097884z98HMDFOGAPIDEHKFMf/ANedX1HXmG3GMFnWU0CRzCLfMMf+P9uKjiTiQwgTCiziTzEUNNMeFADTVXnuXVk/FgQxSTYce8etM8/vhwwjDjBzRDxTRnuueoa9GHWyjxyDEX2c/tHXgz6zXvtOM/u/QjAjigwAwYbpfuvuWsp6ppJvMjyCwh0cMNP22hz/2gAMAwEAAgADAAAAEJx/slp4z36nx7+sgYqzq83D33IBAKIGtkhpBNHssx8RcTw9mq+7ZxqfNkYfaGbzf85wHGt9WUJKsODGNRDDAdDi0mtEaXww9aD6x341y38fTAqqrh78/jnNAAo2pBljocusvjgzujVYy2SGAHs2NzeccHAC3UUulX46RPO6k/zRSWef064899n2ACy13y3LgosKDlrCxq0h5uVq178rXb51DaeQRDHlvnqmjpoy8cMpttDLACD5PnhiV6/p27weEuHfzYuFUw35fEmjSVe52gEHGb80UVeQaCzG2SfsgRkKdzV7+1EySgY+yZEnvur5FojhXt78gmxUt4QEpoktmnWR21GDCQDu8YMS7B8ZzucdRTZrjeUZQd4xpDXXb4ztLrg30mmYDL9ONdmjKWyw83H388G56MC9m1z9WT2GdNAeXsthw+HNugniqNLMu/0ODyAOMo98YInvf6MMGJUQaVVqnV+2dTMDxcLCVbUY+74348x5xJCAEJnOhPztMiLh3Vn4o+rF/hgXZF3oT/QbTMAOtjvkvsL2/pggmpMBwGBpUgUCAQLh4nmZm1vZr5YOTkFOAJritvguukIoy16xY86lH0OJ7p0y3a1cmxuQD4r11iib7nSrZXBGBV+05ePNfcTGoxEf9tsSFKxIWcPuwnSijXtvXUPOeHfDy3tF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"
	   });
  } else {
    if (result.parsed.valid) {
      html = ['<pre>', escape(JSON.stringify(result.parsed.fields, false, 4)), '</pre>', '<pre>', escape(info), '</pre>'];
    } else {
      if (result.parsed.details) {
        var details = [];
        result.parsed.details.forEach(function (d) {
          if (!d.valid) {
            details.push(d);
          }
        });
        info = [info, '', JSON.parse(details, false, 4)].join('\n');

	
      }
      html = ['<pre>', 'Could not parse ocrized text:', '<pre>', '</pre>', escape(info), '</pre>'];
    }
  }
  console.log("html", html);
  $('#parsed').html(html.join('\n'));
  showImages(['painted'] /*result.images*/);
}

function showImages(images, callback, index) {
  if (!index) index = 0;

  if (index >= images.length) {
    if (callback) callback();
    return;
  }

  var random = Math.random();
  worker.addEventListener('message', function showImage(e) {
    var data = e.data;
    if (data.type == 'image' && data.random == random) {
      worker.removeEventListener('message', showImage);
      var imageData = new ImageData(data.rgba, data.width, data.height);
      var canvas = document.createElement('canvas');
      canvas.width = data.width;
      canvas.height = data.height;
      var ctx = canvas.getContext('2d');
      ctx.putImageData(imageData, 0, 0);
      $(canvas).attr('title', data.name);
      $('#detected').append(canvas);
      setTimeout(function () {
        showImages(images, callback, index + 1);
      });
    }
  }, false);

  worker.postMessage({
    cmd: 'get-image',
    image: images[index],
    random: random
  });
}

},{"jquery":1}]},{},[2])

//# sourceMappingURL=demo.bundle.js.map
