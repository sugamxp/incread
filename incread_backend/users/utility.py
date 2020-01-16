def get_impact_score(effort, articles):
    impact_matrix = [[30,55,75,90,100],
                    [5,35,60,80,95],
                    [0,15,40,65,85],
                    [0,0,20,45,70],
                    [0,0,0,25,50]]

    for article_id in articles:
        priority = articles[article_id]
        articles[article_id] = impact_matrix[effort][priority-1]

    print(articles)
    return articles