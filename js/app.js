/**
 * App JS
 */

jQuery(document).ready(function($)
{
  /**
   * Testimonials
   */

  var testimonials = $('div.testimonials'),
    testimonials_rows = testimonials.find('div.row').css({ opacity : 0 }),
    testimonials_active_row = testimonials_rows.first().css({ opacity : 1 }),
    testimonials_slider = testimonials.find('div.slider'),
    testimonials_shift_width = testimonials_active_row.width() - 30,
    testimonials_arrow_prev = testimonials.find('a.arrow.prev'),
    testimonials_arrow_next = testimonials.find('a.arrow.next');

  checkArrows(); // add necessary disabled classes

  testimonials_arrow_prev.click(prevRow);
  testimonials_arrow_next.click(nextRow);

  /**
   * Forms
   */

  var grouped_input = $('.input-group input[type="text"].form-control'),
    grouped_addon = $('.input-group-addon');

  grouped_input.focus(function()
  {
    $(this).parent().find(grouped_addon).addClass('focus');
  })
  .blur(function()
  {
    $(this).parent().find(grouped_addon).removeClass('focus');
  });

  var radioButton = $('.btn[data-value]', '.radio-button-group'),
      radioButtonInput = $('input[type="text"]', '.radio-button-group'),
      activeRadioButton;

  radioButton.click(function() {
    if (!$(this).hasClass('active')) {
      $(this).parent().parent().parent().find('.btn.active').removeClass('active');
      $(this).parent().parent().parent().find('input').attr('value', $(this).data('value')).val($(this).data('value'));
      $(this).addClass('active');
    }
  });

  radioButtonInput.click(function() {
    $(this).parent().parent().parent().parent().find('.btn.active').removeClass('active');
    $(this).attr('value', '');
  })

  /**
   * Previous row (if we find time, combine with nextRow, since only one line is different)
   */

  function prevRow()
  {
    if (!$(this).hasClass('disabled') && (testimonials_active_row.index() !== 0))
    {
      testimonials_active_row.animate({ opacity : 0 }, 300);
      testimonials_active_row = testimonials_active_row.prev().animate({ opacity : 1 }, 1000);
      testimonials_slider.animate({ left : -(testimonials_active_row.index()) * testimonials_shift_width }, 500);

      checkArrows();
    }
  }

  /**
   * Next row (if we find time, combine with prevRow, since only one line is different)
   */

  function nextRow()
  {
    if (!$(this).hasClass('disabled') && testimonials_active_row.index() !== testimonials_rows.length - 1)
    {
      testimonials_active_row.animate({ opacity : 0 }, 300);
      testimonials_active_row = testimonials_active_row.next().animate({ opacity : 1 }, 1000);
      testimonials_slider.animate({ left : -(testimonials_active_row.index()) * testimonials_shift_width }, 500);

      checkArrows();
    }
  }

  /**
   * Update arrows
   */

  function checkArrows()
  {
    // check prev arrow

    if (testimonials_active_row.index() === 0)
    {
      if (!testimonials_arrow_prev.hasClass('disabled'))
      {
        testimonials_arrow_prev.addClass('disabled');
      }
    }
    else if (testimonials_arrow_prev.hasClass('disabled'))
    {
      testimonials_arrow_prev.removeClass('disabled');
    }

    // check next arrow

    if (testimonials_active_row.index() === testimonials_rows.length - 1)
    {
      if (!testimonials_arrow_next.hasClass('disabled'))
      {
        testimonials_arrow_next.addClass('disabled');
      }
    }
    else if (testimonials_arrow_next.hasClass('disabled'))
    {
      testimonials_arrow_next.removeClass('disabled');
    }
  }

  /**
   * Read more block
   */

  var readMore = $('.read-more'),
      ellipses = '<span class="ellipses">...</span>',
      showLength, readMoreParagraph, readMoreText;

  readMore.each(function() {
    showLength = parseInt($(this).data('show'));
    readMoreParagraph = $(this).find('p');
    readMoreText = readMoreParagraph.html();
    if (readMoreText.length > showLength) {
      // readMoreText = readMoreText.replace(/(?:\r\n|\r|\n)/g, '<br />'); // replace new lines with <br />
      readMoreParagraph.html(readMoreText.substring(0, showLength - 1) + ellipses + '<span class="sr-only">' + readMoreText.substring(showLength - 1, readMoreText.length) + '</span> <a href="javascript:void(0)" class="more">Read more</a>');
    }
  });

  $(document).on('click', 'a.more', '.read-more', function() {
    $(this).parent().find('span.sr-only').removeClass('sr-only').parent().find('span.ellipses').remove();
    $(this).remove();
  });

});