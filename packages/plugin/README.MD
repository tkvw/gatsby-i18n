# Gatsby i18n messages plugin

Yet another i18n plugin for gatsby, but done a bit different. 
This plugin generated pages for all configured locales and adds a `messages` and `locale` prop to the `pageContext`.

**There is no requirement on any external i18n library!**

## Install 

```shell script
npm i -D @tkvw/gatsby-plugin-i18n-messages
```  

## Configure 

```javascript
// Create configuration 
const options =  {
   loadMessages: (locale,path) => require(`./locales/${locale}${path}.json`), 
   defaultLocale: 'en',
   locales: ['en','nl'],
   // Optional: allow full control how paths will be generated
   createPathsAndRedirects: (path,locale) => {
     if('/'===path){
       return {
         paths: locale === 'en'? [path,`/${locale}${path}`]:`/${locale}${path}`,
         redirects: {
           [`/${path}/index`]: path,
           [`/${path}/index.html`]: path,
         }
       }         
     }
     return {
       paths: locale === 'en'? [path,`/${locale}${path}`]:`/${locale}${path}`, 
     }    
   }     
}

// In gatsby-config.js add to the plugins array
module.exports = {
  plugins: [{
    resolve: '@tkvw/gatsby-plugin-i18n-messages',
    options  
  }]
}
```
