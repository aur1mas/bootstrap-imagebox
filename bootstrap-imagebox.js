+ function ($) {
  'use strict';

  // BOOTSTRAP-IMAGEBOX CLASS DEFINITION
  // ======================

  var toggle = '[data-toggle="imagebox"]',
      selector = 'div#bootstrapImagebox',
      html = '<div id="bootstrapImagebox" class="modal fade" role="dialog" aria-hidden="true">'+
      '<div class="modal-dialog">'+
        '<div class="modal-content">'+
          // '<div class="modal-header">'+
          //   '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
          //   '<h4 class="modal-title">Modal title</h4>'+
          // '</div>'+
          '<div class="modal-body">'+
            '<div class="text-center imagebox-title"></div>'+
          '</div>'+
        '</div><!-- /.modal-content -->'+
      '</div><!-- /.modal-dialog -->'+
    '</div><!-- /.modal -->'

  var BootstrapImagebox   = function (el) {
    $(el).on('click', toggle, this.toggle)
  }

  BootstrapImagebox.VERSION = '0.0.1'

  BootstrapImagebox.TRANSITION_DURATION = 150

  BootstrapImagebox.prototype.toggle = function (e) {
    var $this    = $(this)
    var title = $this.attr('data-title')

    if (e) e.preventDefault()

    var $parent = $(selector)
    if ($parent.length === 0) $parent = $(html).appendTo($('body'))

    var body = $parent.find('.modal-body'),
        dialog = $parent.find('.modal-dialog'),
        dialogSize = $this.data('dialogSize'),
        titleBar = dialog.find('.imagebox-title').hide(),
        image = $('<img src="' + $this.attr('href') + '" class="img-responsive" width="100%">').insertBefore(titleBar).hide()

    if (title) titleBar.text(title)
    if (dialogSize === 'lg') dialog.addClass('modal-lg')
    if (dialogSize === 'sm') dialog.addClass('modal-sm')


    $parent.modal('show')
    .on('shown.bs.modal', function () {
        image.slideDown(function () {titleBar.slideDown('fast') })
      })
    .on('hidden.bs.modal', function () {
        $('body').removeClass('modal-open')
        $('.modal-backdrop').fadeOut(function () { this.remove() })
        image.remove()
        titleBar.text('')
        dialog.removeClass('modal-lg').removeClass('modal-sm')
      })
  }

  BootstrapImagebox.prototype.escape = function (e) {
    var $parent = $(selector)

    if ($parent.length === 0 && $parent.css('display') != 'block') return

    $parent.modal('hide')
  }


  // BOOTSTRAP-IMAGEBOX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.bootstrapImagebox')

      if (!data) $this.data('bs.bootstrapImagebox', (data = new BootstrapImagebox(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.bootstrapImagebox

  $.fn.bootstrapImagebox             = Plugin
  $.fn.bootstrapImagebox.Constructor = BootstrapImagebox


  // BOOTSTRAP-IMAGEBOX NO CONFLICT
  // =================

  $.fn.bootstrapImagebox.noConflict = function () {
    $.fn.bootstrapImagebox = old
    return this
  }


  // BOOTSTRAP-IMAGEBOX DATA-API
  // ==============

  $(document).on('click.bs.bootstrapImagebox.data-api', toggle, BootstrapImagebox.prototype.toggle)
  $(document).on('keydown.bs.bootstrapImagebox.data-api', toggle, BootstrapImagebox.prototype.escape)
}(jQuery)
