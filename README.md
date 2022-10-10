<p align="center">
  <img width="128px" src="public/icon.svg" />
</p>

<h1 align="center">Flash</h1>
<p align="center">Quickly open files, applications, projects, folders, etc</p>

### Uses

Modifying a Configuration File `config/flash.config.json`:

```
{
  "option":[
    {
      "name":"host",  //option name
      "option_type":"file",  //option type: file,app,folder,project
      "open_in":"", //notepad opens by default 
      "path":"C:\\Windows\\System32\\drivers\\etc\\hosts",  //open paht
      "describe":"host file"
    },
    {
      "name":"flash",
      "option_type":"project",
      "open_in":"D:/Programs/Microsoft VS Code/Code.exe",
      "path":"D:/flash/flash",
      "describe":"flash project"
    },
    ...
  ]
}

```