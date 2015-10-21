var modulesVersion = '0.6.0'; // this package should release with original universe:modules

Package.describe({
    name: 'universe:modules-entrypoint',
    version: modulesVersion,
    summary: 'Use universe:modules without need for *.import.js extension and run Meteor through one entry point.',
    git: '',
    documentation: 'README.md'
});

Package.registerBuildPlugin({
    name: 'compile-universe-modules-entrypoint',
    use: ['universe:modules-compiler@1.0.0'],
    sources: ['plugin.js']
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.2');

    // Use Meteor 1.2 build plugin
    api.use('isobuild:compiler-plugin@1.0.0');

    // Load base package
    api.imply('universe:modules@' + modulesVersion);
});