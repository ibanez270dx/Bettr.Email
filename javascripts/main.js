////////////////////////////////////////////////////////////////////////////////
// Bettr.Email
////////////////////////////////////////////////////////////////////////////////

// Gmail API
var gmail;

// Replacement Categories
var categories = {
  'Primary': {
    'tab': 'Primary',
    'tip': 'Person-to-person conversations and messages that don\'t appear in other tabs.'
  },
  'Social': {
    'tab': 'Career',
    'tip': 'Messages from recruiters, LinkedIn, and other career-centric services.'
  },
  'Promotions': {
    'tab': 'Purchases & Finances',
    'tip': 'Receipts, bills, and other financial records'
  },
  'Updates': {
    'tab': 'Alerts & Updates',
    'tip': 'Confirmations, notifications, and other auto-generated updates.'
  },
  'Forums': {
    'tab': 'Newsletters & Groups',
    'tip': 'Weekly industry newsletters and group emails.'
  }
}

// Replacement Labels
var labels = {
  'Social':'Career',
  'Promotions':'Purchases',
  'Updates':'Alerts',
  'Forums':'Newsletters'
}

////////////////////////////////////////////////////////////////////////////////
// DOM Manipulation
////////////////////////////////////////////////////////////////////////////////

function replaceLogo() {
  $('[aria-label="Navigate to"] span').text('HUMANI.SE');
}

function replaceCategories() {
  $.each(categories, function(key, attrs){
    $('.aKz').each(function(index){
      if(key==$(this).text()) {
        $(this).text(attrs.tab);
        $(this).attr('data-tooltip', attrs.tip);
      }
    });
  });
}

function replaceLabels() {
  $.each(labels, function(key, label){
    regexp = new RegExp(key,"i");
    $(`:not(html,script,link,iframe):not(:has(*)):contains(${key}), .qV`).each(function(index){
      $(this).html( $(this).html().replace(regexp, label) );
    });
  });
}

function addUnreadInbox() {
  if ($('#unread-box').length==0) {
    // Encode the Unread URI
    var uri = "https://mail.google.com/mail/u/0/#search/is:unread";
    var url = encodeURI(uri);

    // Create menuItem
    var menuItem = $('.aim:not(".ain"):first').clone();
    menuItem.children().removeAttr('id');
    menuItem.attr('id','unread-box');
    menuItem.find('a').text('Unread');
    menuItem.find('a').attr('title', 'Unread');
    menuItem.find('a').attr('href', url);
    menuItem.on('click', function(){
      if(!$(this).hasClass('ain')) {
        $(this).addClass('ain');
        window.location = url;
      }
    });

    // Add to sidebar
    $('.aim:first').after(menuItem);

    // Other item clicks
    $('.aim:not(#unread-box)').on('click', function(){
      $('#unread-box').removeClass('ain');
    });
  }
}

////////////////////////////////////////////////////////////////////////////////
// Initialization
////////////////////////////////////////////////////////////////////////////////

function run() {
  replaceLogo();        // change logo
  replaceCategories();  // customize categories
  replaceLabels();      // customize labels
  addUnreadInbox();     // add unread label
}

// start
function init() {
  if((/in/.test(document.readyState)) || (undefined === Gmail) ) {
    if(window.jQuery) { run(); }
    setTimeout('init()', 10);
  } else {
    gmail = new Gmail();
    setInterval(run(), 2000);
  }
}

init();
