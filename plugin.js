Plugin.registerCompiler({
    extensions: ['js', 'jsx'],
    filenames: []
}, function () {
    return new UniverseModulesCompiler({
        _autoExecRegex: /\/app\/main$/ //execute main from app root directory
    });
});