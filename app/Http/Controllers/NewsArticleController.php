<?php

namespace App\Http\Controllers;

use App\NewsArticle;
use App\Newsfilter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class NewsArticleController extends Controller
{

    public function newNewsArticle()
    {
        foreach(Newsfilter::all() as $filter)
        {
            $filters[] = $filter->name;
        }
        return view('cms.cms_new_news_article', compact('filters'));
    }

    public function insertNewsArticle(Request $request)
    {
        /*The database ID's start at 1 while the dropdown indexes at 0, for conversion sake are the id's incremented by 1*/
    	$_POST['filter_id']++;
        if ($_POST['id'] == -1 )
        {
            $this->newArticle($request);
        }
        else
        {
            $this->editArticle($request);
        }

        return Redirect::to('cms/nieuws');
    }

    // Creates a new article
    private function newArticle(Request $request)
    {
        $checked = (isset($_POST['visible'])) ? 1 : 0;
        
        $this->validate($request, [
        		'Image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        $imageName = $request->Image->getClientOriginalName();
        
        $request->Image->move(public_path('img\NieuwsArtikelen'), $imageName);
        
        NewsArticle::Insert(['filter_id' => $_POST['filter_id'], 'title' => $_POST['title'], 'image' => $imageName, 'description' => $_POST['description'], 'text' => $_POST['text'],
                             'date' => $_POST['date'], 'visible' => $checked ]);

    }

    // Edits an article
    // Currently it checks the ID in the Post, in the future the article will be given as an argument.
    private function editArticle(Request $request) //TODO add argument that will be edited
    {
        $checked = (isset($_POST['visible'])) ? 1 : 0;
        
        $this->validate($request, [
        		'Image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        $imageName = $request->Image->getClientOriginalName();
        
        $request->Image->move(public_path('img\NieuwsArtikelen'), $imageName);
        
        NewsArticle::Where('id', '=', $_POST['id'])->update(['filter_id' => $_POST['filter_id'], 'title' => $_POST['title'],
                           'image' => $imageName, 'description' => $_POST['description'], 'text' => $_POST['text'], 'date' => $_POST['date'], 'visible' => $checked ]);
    }

    /* Returns all news articles from the database. */
    public function getAllArticles()
    {
        return NewsArticle::all();
    }

    /* Removes a news article from the database, currently not in use */
    public function deleteArticle($id)
    {
        NewsArticle::Where('id', '=', $id)->Delete();
        return redirect('cms');
    }

    public function createNewsArticlePage()
    {
        if (isset($_POST['id']))
        {
            $article = NewsArticle::find($_POST['id']);
            return view('news_article', compact('article'));
        }
        return view('news_page');
    }
}
