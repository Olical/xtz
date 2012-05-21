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
     * @param {Array|Element} els An element or array of elements that should be converted
     * @param {DateInterface} di An optional interface for your date library, defaults to moment.js
     */
    function DateConverter(els, di) {
        // Store the passed element(s)
        this.els = els;
        
        // If there is a date interface then store it
        // If not, use the default moment.js one
        if(typeof di !== 'undefined') {
            this.di = di;
        }
        else {
            this.di = dateInterfaces.moment;
        }
    }
    
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