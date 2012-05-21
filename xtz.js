/**
 * xtz v1.0.0
 * https://github.com/Wolfy87/xtz
 *
 * Oliver Caldwell (http://oli.me.uk)
 * Creative Commons Attribution 3.0 Unported License (http://creativecommons.org/licenses/by/3.0/)
 */

;(function(exports) {
    /*jshint smarttabs:true*/
    
    /**
     * Interacts with your date library of choice
     * This abstraction allows you to use any date library
     *
     * @param {Function} parse Called when parsing a date, is passed the date string
     * @param {Function} format Called when displaying the date, is passed the returned value from parse and a formatting string
     * @param {Function} valid Used to validate a date object returned by parse, return true if it is valid, false if not
     */
    function DateInterface(parse, format, valid) {
        // Store the methods
        this.parse = parse;
        this.format = format;
        this.valid = valid;
    }
    
    // If moment.js is loaded then create an interface for it
    // This will be used as the default date interface
    // http://momentjs.com
    // Copy and edit this to create your own
    var dateInterfaces = {};
    if(typeof moment === 'function') {
        dateInterfaces.moment = new DateInterface(
            function(date) {
                // Parsing
                return moment(date);
            },
            function(date, format) {
                // Formating
                return date.format(format);
            },
            function(date) {
                // Validating
                return !isNaN(date.unix());
            }
        );
    }
    
    /**
     * Runs over all passed elements and converts them to a local time
     * Will not run until you explicitly call `run` on it
     * So you can call it when your library says the DOM is ready
     *
     * @param {DateInterface} di An optional interface for your date library, defaults to moment.js, false will also make it use the default
     * @param {String} format An optional default format for dates to display with
     */
    function DateConverter(di, format) {
        // If there is a date interface then store it
        // If not, use the default moment.js interface
        if(typeof di !== 'undefined' && di !== false) {
            this.di = di;
        }
        else {
            this.di = dateInterfaces.moment;
        }
        
        // Store the default format
        // If it is not there then create a default default
        if(typeof format !== 'undefined') {
            this.format = format;
        }
        else {
            // 1st January, 2002 at 10:00pm
            this.format = 'Do MMMM, YYYY [at] h:mma';
        }
    }
    
    /**
     * Converts an individual element
     *
     * @param {Element} el The element to convert
     */
    DateConverter.prototype.convert = function(el) {
        // Parse the current date
        var raw = el.innerHTML,
            date = this.di.parse(raw);
        
        // Output it back in with the correct format if the date is valid
        if(this.di.valid(date)) {
            el.innerHTML = this.di.format(date, el.getAttribute('data-format') || this.format);
        }
        else {
            throw '"' + raw + '"' + ' is not a valid date.';
        }
    };
    
    /**
     * Executes the date converter
     * Call this when the DOM is ready with your element(s)
     *
     * @param {Array|Element} els An element or array of elements that should be converted
     */
    DateConverter.prototype.run = function(els) {
        // If els is an element then convert it
        // Otherwise it is an array, so loop and execute
        if(els.nodeType) {
            this.convert(els);
        }
        else {
            for(var i = 0; i < els.length; i += 1) {
                this.convert(els[i]);
            }
        }
    };
    
    // Build the namespace to export and export it
    // If AMD is available then fire that too
    var namespace = {
        DateInterface: DateInterface,
        dateInterfaces: dateInterfaces,
        DateConverter: DateConverter
    };
    
    exports.xtz = namespace;
    
    if(typeof define === 'function' && define.amd) {
        define(function() {
            return namespace;
        });
    }
}(this));