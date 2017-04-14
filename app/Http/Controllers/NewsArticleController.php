<?php

namespace App\Http\Controllers;

use App\NewsArticle;
use Illuminate\Http\Request;

class NewsArticleController extends Controller
{
    public function insertNewsArticle() {
        if ($_POST['ID'] == -1 ){
            $this->newArticle();
        }
        else {
            $this->editArticle();
        }

        return redirect('cms_nieuws');
    }

    private function newArticle()
    {
        $checked = (isset($_POST['Visible'])) ? 1 : 0;
        NewsArticle::Insert(['Title' => $_POST['Title'], 'Description' => $_POST['Description'], 'Text' => $_POST['Text'], 'Date' => $_POST['Date'], 'Visible' => $checked ]);

    }

    private function editArticle()
    {
        $checked = (isset($_POST['Visible'])) ? 1 : 0;
        NewsArticle::Where('ID', '=', $_POST['ID'])->update(['Title' => $_POST['Title'], 'Description' => $_POST['Description'], 'Text' => $_POST['Text'], 'Date' => $_POST['Date'], 'Visible' => $checked ]);
    }

    public function getAllArticles()
    {
        return App\NewsArticle::all();
    }

    public function deleteArticle($id)
    {
        NewsArticle::Where('ID', '=', $id)->Delete();

        return redirect('cms');
    }
}
