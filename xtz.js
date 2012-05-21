;(function(exports) {
    /*jshint smarttabs:true*/
    
    /**
     * Interacts with your date library of choice
     * This abstraction allows you to use any date library
     *
     * @param {Function} parse Called when parsing a date, is passed the date string
     * @param {Function} format Called when displaying the date, is passed a formatting string
     */
    function DateInterface(parse, format) {
        // Store the methods
        this.parse = parse;
        this.format = format;
    }
}(this));