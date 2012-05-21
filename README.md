# xtz - Localize your pages times

xtz is a library for converting dates on your page to the users local time. It supports any date library through a date interface which is incredibly easy to set up. All you have to do is pass it your elements and it will convert them to the local time found in the browser.

## Quickstart

This will guide you through setting up xtz as quick as possible. It will use [moment.js](http://momentjs.com/) as it's date library. Check the dependencies section if you would like to use something else.

First include your scripts, first moment and then xtz. I would recommend placing these at the bottom of your body tag but above your code that will execute it. You will obviously have to download the scripts and correct their paths.

    <script type='text/javascript' src='javascript/moment.js'></script>
    <script type='text/javascript' src='javascript/xtz.js'></script>

Now in your code you can initiate an instance of `xtz.DateConverter`.

    var converter = new xtz.DateConverter();

All you have to do now is execute it. I am using the [MooTools](http://mootools.net/) selector engine to find the elements but you can use anything you want. You can pass an array of elements or a single element.

    converter.run($$('span.my-date'));

Now in your HTML, any date in a span with a class of `my-date` will be converted to the local time. It will be converted to the default date format: `Do MMMM, YYYY [at] h:mma`. To change this you can either pass false for the custom interface and then a string like so.

    var converter = new xtz.DateConverter(false, 'YYYY HH:mm');

Or you can specify `data-format` on the individual elements. So here are a couple of example date elements.

    <span class='my-date'>27 January, 2000 10:00:00 CST</span>
    <span class='my-date' data-format='DD/MM/YYYY - HH:mm'>27 January, 2000 10:00:00 CST</span>

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