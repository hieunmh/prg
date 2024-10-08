<?php

namespace App\Service;

use App\Models\Question;
use Illuminate\Support\Str;

class QuestionService 
{
    public function createQuestion($questions, $exam_id) {
        $contents = [];
        for ($i = 0; $i < count($questions); $i++) {
            array_push($contents, [
                'id' => (string) Str::uuid(),
                'exam_id' => $exam_id,
                'content' => $questions[$i]['content']
            ]);
        }
        Question::insert($contents);
        return $contents;
    }

    public function shuffleQuestion($questions) {
        return $questions->shuffle();
    }
}