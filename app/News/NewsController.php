<?php namespace News;
class NewsController
{
    public function process() 
    {
        header('Content-Type: application/json');
        try {
            $url    = isset($_GET['url']) ? $_GET['url'] : null;
            if (!$url) {
                $url = "http://{$_SERVER['HTTP_HOST']}/public/news_mock.json";
            }
            $news   = new NewsRepository($url);
            $news->validateUrl();
            $data   = $news->fetch();
            $news->validateContent($data);
            return $data;
        } catch (\Exception $e) {
            header("HTTP/1.1 500");
            return json_encode(['error' => $e->getMessage()]);
        }
    }
}