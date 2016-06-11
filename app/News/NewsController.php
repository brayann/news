<?php namespace News;
class NewsController
{
    public function process() 
    {
        header('Content-Type: application/json');
        try {
            $url    = isset($_POST['url']) ? $_POST['url'] : null;
            $news   = new NewsRepository($url);
            $news->validateUrl();
            $data   = $news->fetch();
            $news->validateContent($data);
            return $data;
        } catch (\Exception $e) {
            return json_encode(['error' => $e->getMessage()]);
        }
    }
}