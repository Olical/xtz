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
    
    // If moment is loaded then create an interface for it
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
}(this));