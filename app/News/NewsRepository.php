<?php namespace News;

class NewsRepository
{
    /**
     * @var string url
     */
    private $url;

    public function __construct($url)
    {
        $this->url = $url;
    }

    /**
     * @return bool
     * @throws \Exception
     */
    public function validateUrl()
    {
        if (!filter_var($this->url, FILTER_VALIDATE_URL)) {
            throw new \Exception('URL passed is not valid');
        }
        return true;
    }

    /**
     * @param $content
     * @return bool
     * @throws \Exception
     */
    public function validateContent($content)
    {
        $content = json_decode($content, 1);
        if (!is_array($content) || empty($content) || !is_array($content[0]) || !isset($content[0]['title']) || !isset($content[0]['content']) || !isset($content[0]['id']) || !isset($content[0]['image'])) {
            throw new \Exception('Content not valid');
        }
        return true;
    }

    public function fetch()
    {
        if (!$content = @file_get_contents($this->url)) {
            throw new \Exception('There was an error fetching this URL content');
        }
        return $content;
    }
}