var src = '../public/wp-content/themes/ho';

module.exports = {

    inject : {
        ignorePath : "/../public/wp-content/themes/ho",
        watchLibs : src + "/libs/**/*.js",
        watchVueMixins: src + "/vue-mixins/**/*.js",
        watchBlocks : src + "/blocks/**/*.js",
        watchPods : src + "/pods/**/*.js",
        watchMixins : src + "/mixins/**/*.js",
        watchVue: src + "/vue/**/*.js",
        watchPartials: src + "/partials/**/*.js",
        src : src + "/dev-include.gulp",
        dest: src,
        target : "include.includes"
    },
    build : {
        src : src + "/include.includes",
        dest : src+"/build",
        target : "live-include.includes"
    },
    css: {
        scss : src+"/style.scss",
        target: src+"/css",
        watchCss : src + "/css/**/*.scss",
        watchVueMixins: src + "/vue-mixins/**/*.js",
        watchBlocks : src + "/blocks/**/*.scss",
        watchPods : src + "/pods/**/*.scss",
        watchMixins : src + "/mixins/**/*.scss",
        watchVue: src + "/vue/**/*.scss",
        watchPartials: src + "/partials/**/*.scss",
        watchHelper: src + "/helper/**/*.scss",
        watchStyleguide: src + "/storybook/stories/**/*.scss",
        watchApps: src + "/apps/**/*.scss",
        src: "stylesheets",
        dest: "stylesheets",
        autoprefixer: {
            browsers: ["last 3 versions"]
        },
        sass: {
            indentedSyntax: false,
            includePaths: [
                "./node_modules/flexboxgrid-sass"
            ]
        },
        extensions: ["sass", "scss", "css"]
    },

    adminInject : {
        ignorePath : "/../public/wp-content/themes/ho",
        watchLibs : src + "/libs/**/*.js",
        watchVueMixins: src + "/vue-mixins/**/*.js",
        watchBlocks : src + "/blocks/**/*.js",
        watchPods : src + "/pods/**/*.js",
        watchMixins : src + "/mixins/**/*.js",
        watchVue: src + "/vue/**/*.js",
        watchPartials: src + "/partials/**/*.js",
        src : src + "/dev-gutenberg-include.gulp",
        dest: src,
        target : "gutenberg.includes"
    },

    admin: {
        scss : src+"/css/admin.scss",
        target: src+"/css",
        watchCss : src + "/css/**/*.scss",
        watchAdmin : src + "/admin/css/**/*.scss",
        watchModules : src + "/modules/**/*.scss",
        watchBlocks : src + "/blocks/**/*.scss",
        watchVue: src + "/vue/**/*.scss",
        watchPods : src + "/pods/**/*.scss",
        watchServices : src + "/services/**/*.scss",
        watchSpecials: src + "/specials/**/*.scss",
        watchMixins : src + "/mixins/**/*.scss",
        watchPartials: src + "/partials/**/*.scss",
        watchHelper: src + "/helper/**/*.scss",
        src: "stylesheets",
        dest: "stylesheets",
        autoprefixer: {
            browsers: ["last 3 versions"]
        },
        sass: {
            indentedSyntax: false,
            includePaths: [
                "./node_modules/flexboxgrid-sass"
            ]
        },
        extensions: ["sass", "scss", "css"]
    },

    styleguide: {
        scss : "../storybook/stories/styleguide.scss",
        target: src+"/css",
        watchStyleguide : "../storybook/stories/**/*.scss",
        src: "stylesheets",
        dest: "stylesheets",
        autoprefixer: {
            browsers: ["last 3 versions"]
        },
        sass: {
            indentedSyntax: false
        },
        extensions: ["sass", "scss", "css"]
    }
};
