# xtz - Localize your pages times

xtz is a library for converting dates on your page to the users local time. It supports any date library through a date interface which is incredibly easy to set up. All you have to do is pass it your elements and it will convert them to the local time found in the browser.

## Dependencies

The script only requires a date library. By default it is configured to use [moment.js](http://momentjs.com/) if it's present in the page, if it isn't you can just configure your own as I have in `testing.html`. In there you can see that I have set up an instance to use [XDate](http://arshaw.com/xdate/). Here is the code I use in this test.

    // Set up the interface
    var xdateInterface = new xtz.DateInterface(
        function(date) {
            // Parsing
            return XDate(date);
        },
        function(date, format) {
            // Formating
            return date.toString(format);
        },
        function(date) {
            // Validating
            return date.valid();
        }
    );
    
    // Create a new date converter using the interface
    // Also specify a default formatting string
    var customInterface = new xtz.DateConverter(xdateInterface, 'dd MMMM, yyyy \'at\' h:mmtt');
    
    // Now run it on the elements using MooTools' selector engine
    customInterface.run($$('.date-custom-interface'));

By copying and editing the code above you can integrate it with any library that can parse, format and validate a date.

## License

[![Creative Commons License](http://i.creativecommons.org/l/by/3.0/88x31.png)](http://creativecommons.org/licenses/by/3.0/)

xtz by [Oliver Caldwell](http://oli.me.uk) is licensed under a [Creative Commons Attribution 3.0 Unported License](http://creativecommons.org/licenses/by/3.0/).