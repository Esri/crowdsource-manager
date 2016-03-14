$(function(){
    //$("table").stickyTableHeaders({container: "#container"});
    //$("table").stickyTableHeaders();
});
/*! Copyright (c) 2011 by Jonas Mosbech - https://github.com/jmosbech/StickyTableHeaders
    MIT license info: https://github.com/jmosbech/StickyTableHeaders/blob/master/license.txt */

;(function ($, window, undefined) {
    'use strict';

    var pluginName = 'stickyTableHeaders';
    var defaults = {
            fixedOffset: 0,
            container: null
        };


    /* 
     * This was taken from stackoverflow:
     * http://stackoverflow.com/questions/7501761/div-scrollbar-width
     */
    function getScrollbarWidth() 
    {
        var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div></div>'); 
        $('body').append(div); 
        var w1 = $('div', div).innerWidth(); 
        div.css('overflow-y', 'auto'); 
        var w2 = $('div', div).innerWidth(); 
        $(div).remove(); 
        return (w1 - w2);
    }


    function Plugin (el, options) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        base.options = $.extend({}, defaults, options);

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Cache DOM refs for performance reasons
        base.$window = $(window);
        base.$clonedHeader = null;
        base.$originalHeader = null;
        base.$container = base.options.container != null ? $(base.options.container) : base.$window;

        /* Need to use element to get offset if container is window.
         * Otherwise use container's offset for calculations.
         */
        base.getContainerOffset = function(){
            var c_offset = base.$container.offset();
            var e_offset = base.$el.offset();
            return c_offset === null ? {'top': 0, 'left': e_offset.left} : c_offset;
        };

        /* We need to know how much to scroll to activate and deactivate the
         * sticky header. I originally tried to calculate this using .position
         * on the child element. This works fine so long as the parent element
         * has its position set to something other than "static". Please
         * see this stackoverflow thread for why:
         *  http://stackoverflow.com/questions/2842432/jquery-position-isnt-returning-offset-relative-to-parent
         *
         * So to get this to work everywhere, I grab the difference from
         * the top of the child element and the top of the parent element
         * when the page loads. This should tell us how much we need to
         * scroll to activate the sticky header.
         *
         * Also - the offset function does not seem to take any table
         * captions into consideration. So we check for a table caption
         * and add this in to the amount we need to scroll for an
         * activation.
         */
        var startTopOffset = base.$el.offset().top - base.getContainerOffset().top;
        var caption = base.$el.find('caption');
        if (caption.length){
            startTopOffset += caption.height();
        }
        base.scrollAmountToActivate = startTopOffset;
        base.scrollAmountToDeactivate = base.scrollAmountToActivate + base.$el.height();

        /* See notes in updateWidth for why we need this*/
        base.parentClientWidth = base.$container.width() - getScrollbarWidth();

        // Keep track of state
        base.isCloneVisible = false;
        base.leftOffset = null;
        base.topOffset = null;

        base.calcNewHeaderPosition = function() {
            var windowScrollTop = base.$window.scrollTop();
            var containerOffset = base.getContainerOffset();
            var elementOffset = base.$el.offset();
            var scrollLeft = base.$container.scrollLeft() + base.$window.scrollLeft();
            var newLeft = containerOffset.left - scrollLeft;
            var newTop;                    
            if(windowScrollTop > containerOffset.top) {
                newTop = 0;
            }
            else {
                //newTop = Math.max(containerOffset.top - windowScrollTop,
                //                  elementOffset.top - windowScrollTop);
                newTop = containerOffset.top - windowScrollTop;
            }
            base.$clonedHeader.css({
                'top': newTop,
                'margin-top': 0,
                'left' : newLeft,
                'display': 'block'
            });            
        };
        
        base.init = function () {

            base.$el.each(function () {
                var $this = $(this);

                // remove padding on <table> to fix issue #7
                $this.css('padding', 0);

                $this.wrap('<div class="divTableWithFloatingHeader"></div>');

                base.$originalHeader = $('thead:first', this);
                base.$clonedHeader = base.$originalHeader.clone();

                base.$clonedHeader.addClass('tableFloatingHeader');
                base.$clonedHeader.css({
                    'position': 'fixed',
                    'top': 0,
                    'z-index': 1, // #18: opacity bug
                    'display': 'none'
                });

                base.$originalHeader.addClass('tableFloatingHeaderOriginal');
                base.$originalHeader.after(base.$clonedHeader);

                // enabling support for jquery.tablesorter plugin
                // forward clicks on clone to original
                $('th', base.$clonedHeader).click(function (e) {
                    var index = $('th', base.$clonedHeader).index(this);
                    $('th', base.$originalHeader).eq(index).click();
                });
                $this.bind('sortEnd', base.updateWidth);
            });

            base.updateWidth();
            base.toggleHeaders();
            base.$container.scroll(base.toggleHeaders);
            base.$container.resize(base.toggleHeaders);
            base.$container.resize(base.updateWidth);
            base.$window.scroll(function() { 
                base.toggleHeaders();
                if(base.isCloneVisible) {
                    base.calcNewHeaderPosition();
                }
            });
        };

        base.toggleHeaders = function () {
            base.$el.each(function () {
                var $this = $(this);
                var newTopOffset = isNaN(base.options.fixedOffset) ?
                    base.options.fixedOffset.height() : base.options.fixedOffset;
                var containerOffset = base.getContainerOffset();
                var elementOffset = base.$el.offset();
                var scrollTop = base.$container.scrollTop() + newTopOffset;
                var windowScrollTop = base.$window.scrollTop();
                var scrollLeft = base.$container.scrollLeft();
                var scrolledEnoughToActivate = (scrollTop > base.scrollAmountToActivate) || (windowScrollTop > elementOffset.top);
                if (  scrolledEnoughToActivate && (scrollTop < base.scrollAmountToDeactivate) ) {
                    var newLeft = containerOffset.left - scrollLeft;
                    if (base.isCloneVisible && (newLeft === base.leftOffset) && (newTopOffset === base.topOffset)) {
                        return;
                    }
                    base.calcNewHeaderPosition();
                    base.updateWidth();

                    base.$originalHeader.css('visibility', 'hidden');
                    base.isCloneVisible = true;
                    base.leftOffset = newLeft;
                    base.topOffset = newTopOffset;
                }
                else if (base.isCloneVisible) {
                    base.$clonedHeader.css('display', 'none');
                    base.$originalHeader.css('visibility', 'visible');
                    base.isCloneVisible = false;
                }
            });
        };

        base.updateWidth = function () {
            // Copy cell widths and classes from original header
            $('th', base.$clonedHeader).each(function (index) {
                var $this = $(this);
                var $origCell = $('th', base.$originalHeader).eq(index);
                this.className = $origCell.attr('class') || '';
                $this.css('width', $origCell.width() + 25);
            });

            // Copy row width from whole table
            base.$clonedHeader.css('width', base.$originalHeader.width());

            // One last thing - if our table is inside of another
            // scrolled div, the width of our parent div could
            // be less than that of the cloned header.
            // This would cause the cloned div to display outside
            // of our parent's viewport and would appear "on top of"
            // any scrollbars on our parent. Need to clip.
            if(base.$clonedHeader.width() > base.parentClientWidth)
            {
                var scrollLeft = base.$container.scrollLeft();
                var clipLeft = scrollLeft;
                var clipRight =  base.parentClientWidth + scrollLeft;
                base.$clonedHeader.css({
                    'clip': 'rect(0px, ' + clipRight + 'px, ' 
                                       + base.$clonedHeader.height() + 'px,' 
                                       + clipLeft + 'px)'
                    });
            }
            
        };

        // Run initializer
        base.init();
    }

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };

})(jQuery, window);
