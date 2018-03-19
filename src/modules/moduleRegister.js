

import Map from '../structures/map'


class ModuleProxyRegister
{
    constructor()
    {
        this.proxyModules = new Map();
    }

    attach(manager, moduleName, args)
    {
        let modules = manager.attached;

        if (modules.has(moduleName))
            throw new Error('ModuleManager.attach: Could not attach module ' + moduleName + '. Already exists');

        if (!this.proxyModules.has(moduleName))
            throw new Error('ModuleManager.attach: Module type ' + moduleName + ' don\'t exists.');

        var mod = this.proxyModules.get(moduleName)(manager, args);
        manager._pendingModules.push(mod);
        return mod;
    }

    register(moduleName, func)
    {
        if (!ModuleRegister.proxyModules.has(moduleName))
            ModuleRegister.proxyModules.set(moduleName, func); // { type: moduleType, func: func }
        
    }    
}

var ModuleRegister = new ModuleProxyRegister();

export default ModuleRegister;