(function( $ ) {

    function timestamp(line, format) {
        if (format == 'dd/mm/yyyy') {
            var parts = line.substr(0, 10).split('/');
            return (new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]))).getTime();
        }
        return 0;
    }

    function repeat(string, times) {
        times = times > 0 ? times : 1;
        return Array(times + 1).join(string);
    }

    $.fn.calcview = function(options) {
        var settings = $.extend({
            preStyle: true,
            sort: false,
            sortByDate: false,
            capitalize: false,
            lineBreak: /<br\s*\/?>/i,
            lineBreakSymbol: '<br/>',
            lineHeight: 16,
            column: 80,
        }, options );

        return this.each(function() {
            var panel = $(this);
            //panel.css('background-color', '#E5E5F7');
            //panel.css('opacity', '0.4');
            panel.css('line-height', settings.lineHeight+'px');
            panel.css('background-image', 'linear-gradient(0deg, #FFFFFF 50%, #FAFAFA 50%)');
            panel.css('background-size', (settings.lineHeight*2)+'px '+(settings.lineHeight*2)+'px');
            if (settings.preStyle) {
                panel.css('white-space', 'pre');
            }
            panel.css('font-family', 'monospace');
            var data = panel.html().trim().split(settings.lineBreak);
            data = data.map(function(line){
                line = line.trim()
                return line.replace(':.. ', repeat(' ', settings.column - line.length + 3));
            })
            if (settings.capitalize) {
                data = data.map(function(line){
                    return line.charAt(0).toUpperCase() + line.slice(1);
                })
            }
            if (settings.sort) {
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
