(function( $ ) {

    function timestamp(line, format) {
        if (format == 'dd/mm/yyyy') {
            var parts = line.substr(0, 10).split('/');
            return (new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]))).getTime();
        }
        return 0;
    }

    $.fn.calcview = function(options) {
        var settings = $.extend({
            preStyle: false,
            sort: false,
            sortByDate: false,
            capitalize: false,
            lineBreak: /<br\s*\/?>/i,
            lineBreakSymbol: '<br/>',
            column: 80,
        }, options );

        return this.each(function() {
            var panel = $(this);
            if (settings.preStyle) {
                panel.css('white-space', 'pre');
            }
            panel.css('font-family', 'monospace');
            var data = panel.html().split(settings.lineBreak);
            if (settings.sort) {
                if (settings.capitalize) {
                    data = data.map(function(line){
                        return line.charAt(0).toUpperCase() + line.slice(1);
                    })
                }
                if (settings.sortByDate) {
                    data.sort(function(a, b) {
                        a = timestamp(a, settings.sortByDate);
                        b = timestamp(b, settings.sortByDate);
                        if (a < b) { return -1; }
                        if (a > b) { return 1; }
                        return 0;
                    });
                } else {
                    data.sort();
                }
            }
            panel.html(data.join(settings.lineBreakSymbol));
        });
    };

}( jQuery ));
