import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import * as $ from 'jquery';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';


import * as strings from 'SearchExtApplicationCustomizerStrings';

const LOG_SOURCE: string = 'SearchExtApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ISearchExtApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class SearchExtApplicationCustomizer
  extends BaseApplicationCustomizer<ISearchExtApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }

    var searchElement = document.getElementsByClassName("sideActionsWrapper-131");
    var defaultRadio = document.createElement("input");
    var globalRadio = document.createElement("input");
    defaultRadio.type = "radio";
    defaultRadio.name = "searchRadio";
    defaultRadio.value = "default";
    defaultRadio.checked = true;
    globalRadio.type = "radio";
    globalRadio.name = "searchRadio";
    globalRadio.value = "global";
	  var labelDefault = document.createElement("label");
    var labelGlobal = document.createElement("label");
    labelDefault.className = "lable-rd";
    labelGlobal.className = "lable-rd";
    labelDefault.style.display = "contents";    
    labelGlobal.style.display = "contents";
    labelDefault.appendChild(defaultRadio);
    labelGlobal.appendChild(globalRadio);

    labelDefault.appendChild(document.createTextNode("Default"));
    labelGlobal.appendChild(document.createTextNode("Global"));
	  searchElement[0].appendChild(labelDefault);
    searchElement[0].appendChild(labelGlobal);
    $(".actionsSubcell-132").append("<input id='globalInput' type='text'></input>");
    $("#globalInput").css('display','none');
    $("#globalInput").css({
      'max-width': '100%','height': '36px','z-index': '9','border': '1px solid #eaeaea','width': '272px'
    });
    //$(".lable-rd").css('display','contents');

    //$("").addClass("important");

    $('input[type=radio][name=searchRadio]').change(function() {
      if($(this).val() == 'global'){
         $(".searchCell-135").css('display','none');       
         $("#globalInput").css('display','block');
      }else{
         $(".searchCell-135").css('display','block ');
         $("#globalInput").css('display','none');
      }
    });

    $('#globalInput').on("keypress", function(e) {
      if (e.keyCode == 13) {
          window.location.href = "https://infogain77.sharepoint.com/_layouts/15/search.aspx/siteall?q=" + $("#globalInput").val();
          return false; // prevent the button click from happening
      }
    });

    return Promise.resolve();
  }
}
