<script lang="ts">
  import { logotext } from "$lib/utils/stores";

  // let $logotexttext = logotext.subscribe((value) => JSON.stringify(value));
</script>
<!-- <svg id="floter-logo" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 287.4 83.5" width="290" height="85">
  <path id="r" d="M259.9 82.4h-24.2l11.6-54.9h22l-2.7 12.9c4.5-8.9 11-14 18.1-14 1 0 2.1 0 2.7.2l-4.7 22.1c-1.4-.4-3.3-.9-6.4-.9-5.4 0-9.7 2.3-10.8 7.7l-5.6 26.9z"/>
  <path id="e" d="M237.9 59.3h-35.7c.3 5.2 2.2 7.5 6.5 7.5 2.9 0 5.1-1.5 5.9-4.2h22.3c-4.3 13.2-14.5 20.9-30.4 20.9-16.3 0-26.5-9.7-26.5-25.2 0-17.8 13.4-32 32.3-32 16.3 0 26.5 9.7 26.5 25.2 0 2.7-.4 5.3-.9 7.8zM203.3 50h13.5c-.2-4-1.8-6.5-6-6.5-3.4 0-6.1 2.1-7.5 6.5z"/>
  <path id="t" d="M171.5 65.9c1.9 0 4.3-.3 6.3-1L174 82.2c-2.5.8-7.1 1.3-11.1 1.3-14 0-23.2-5.1-19.6-22.3l3.5-16.7h-5.5l3.6-17h5.5l3.3-15.4H178l-3.3 15.4h11l-3.6 17h-11l-3.3 15.8c-.9 3.9.3 5.6 3.7 5.6z"/>
  <polygon id="odash" points="137.1,22.5 94.7,22.4 98.2,5.7 140.6,5.9 "/>
  <path id="o" d="M111.4 26.4c16.7 0 27.2 9.7 27.2 25.2 0 17.8-13.7 32-33.1 32-16.7 0-27.2-9.7-27.2-25.2 0-17.9 13.8-32 33.1-32zm-3.9 36.7c5.3 0 8.8-4.3 8.8-9.4 0-4.2-2.5-6.8-6.6-6.8-5.4 0-8.9 4.3-8.9 9.4 0 4.1 2.5 6.8 6.7 6.8z"/>
  <polygon id="l" points="45.5,82.4 63,0 87.1,0 69.7,82.4"/>
  <polygon id="F" points="17.5,0 59.7,0 55.5,19.8 36.9,19.8 34.1,33 50.5,33 46.3,52.7 29.9,52.7 23.6,82.4 0,82.4"/> 
</svg> -->
<div id="floter-logo">{$logotext}</div>

  <style>
    /* #floter-logo {
      fill: currentColor;
      height: 100%;
      width: auto;
      display: block;
    } */
    #floter-logo {
      text-decoration: none;
      display: block;
      font-size: 36px;
      letter-spacing: -0.033em;
      line-height: 36px;

      @media screen and (min-width: 768px) {
        font-size: 48px;
      }
    }
  </style>