function setNavigationAndHeadline(category,postID)
{
    var $categoryListItem = setMainMenuActive(category,postID);
}

function setMainMenuActive(category,postID,customPostType)
{
    jQuery('ul li.current').removeClass("current");

    // remove active state from current main menu item
    jQuery('#adminmenu .wp-has-current-submenu')
        .addClass('wp-not-current-submenu')
        .removeClass('wp-has-current-submenu wp-menu-open');

    if(customPostType === undefined)
    {
        var p  = document.location.pathname.split("/");
        var pFile = p[p.length-1];

        if(pFile==="post.php")
            pFile = "post-new.php";

        var s = "?category_name="+category;
        var current = pFile+s;
    }
    else
    {
        var p  = document.location.pathname.split("/");
        var pFile = p[p.length-1];

        if(pFile==="post.php")
            pFile = "post-new.php";

        var s = "?post_type="+customPostType;
        var current = pFile+s;
    }

    var $categoryLink = jQuery('#adminmenu a[href$="' + current + '"]');



    if(postID !== undefined && $categoryLink.length === 0) //SINGLE PAGE EXCEPTION
    {
        var links = jQuery('#adminmenu a');

        for(var i=0;i<links.length;i++)
        {
            var link = jQuery(links[i]).attr("href");

            if(link === "post.php?post="+postID+"&action=edit")
            {
                $categoryLink = jQuery(links[i]);
            }
            else if(link === "post.php?post="+postID+"&action=edit&delete=true")
            {
                $categoryLink = jQuery(links[i]);
            }
            else if(link === "post.php?post="+postID+"&action=edit&delete=false")
            {
                $categoryLink = jQuery(links[i]);
            }
        }
    }

    // set new main menu item active
    var $categoryListItem = null;

    if($categoryLink.length === 0)
    {
        $categoryLink = jQuery('#adminmenu a[href$="' + pFile+document.location.search + '"]');
    }

    if($categoryLink.length === 1)
    {
        $categoryListItem   = $categoryLink.closest("li");
        $categoryListItem.addClass("current");
        $categoryLink.addClass("current");
    }
    else
    {
        $categoryLink = jQuery($categoryLink[($categoryLink.length-1)]);
        $categoryLink.closest("li").addClass("current");
        $categoryLink.addClass("current");
    }


    $categoryListItem = $categoryLink.closest(".menu-top");
    var classesToAdd 		= 'wp-has-submenu wp-has-current-submenu wp-menu-open current';
    var classesToRemove 	= 'wp-not-current-submenu';

    jQuery($categoryListItem.find("a")[0]).addClass(classesToAdd).removeClass(classesToRemove);
    $categoryListItem.addClass(classesToAdd).removeClass(classesToRemove);

    return $categoryLink;
}

function setMainHeadline(headline)
{
    jQuery('.wrap h1:first').text(headline);
}