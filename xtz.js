;(function(exports) {
    /*jshint smarttabs:true*/
    
    /**
     * Interacts with your date library of choice
     * This abstraction allows you to use any date library
     *
     * @param {Function} parse Called when parsing a date, is passed the date string
     * @param {Function} format Called when displaying the date, is passed the returned value from parse and a formatting string
     */
    function DateInterface(parse, format) {
        // Store the methods
        this.parse = parse;
        this.format = format;
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
            }
        );
    }
    
    /**
     * Runs over all passed elements and converts them to a local time
     * Will not run until you explicitly call `run` on it
     * So you can call it when your library says the DOM is ready
     *
     * @param {DateInterface} di An optional interface for your date library, defaults to moment.js
     */
    function DateConverter(di) {
        // If there is a date interface then store it
        // If not, use the default moment.js interface
        if(typeof di !== 'undefined') {
            this.di = di;
        }
        else {
            this.di = dateInterfaces.moment;
        }
    }
    
    /**
     * Converts an individual element
     *
     * @param {Element} el The element to convert
     */
    DateConverter.prototype.convert = function(el) {
        
    };
    
    /**
     * Executes the date converter
     * Call this when the DOM is ready with your element(s)
     *
     * @param {Array|Element} els An element or array of elements that should be converted
     */
    DateConverter.prototype.run = function(els) {
        // If els is an array then loop and execute
        // Otherwise just run the single element
        if(els instanceof Array) {
            for(var i = 0; i < els.length; i += 1) {
                this.convert(els[i]);
            }
        }
        else {
            this.convert(els);
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