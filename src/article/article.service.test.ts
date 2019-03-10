import { ArticleRepository } from './article.repository';
import { ArticleService } from './article.service';

describe('ArticleService', () => {
  let service: ArticleService;
  let repository: ArticleRepository;

  beforeAll(async () => {
    repository = {} as any;
    service = new ArticleService(repository);
  });

  beforeEach(async () => {});

  it('Should call and return repository.create with an article passed in param', async () => {
    const article = { title: 'Title 1' };
    repository.save = jest.fn().mockResolvedValue(article);

    const result = await service.create(article as any);

    expect(result).toBe(article);
    expect(repository.save).toHaveBeenCalledWith(article);
  });

  describe('findAll', () => {
    it('Should call and return repository.find', async () => {
      const articles = [{ title: 'article 1' }, { title: 'article 2' }];
      const page = 1;

      repository.find = jest.fn().mockResolvedValue(articles);

      const result = await service.findAll(page);

      expect(result).toBe(articles);
      expect(repository.find).toHaveBeenCalled();
    });

    it('Should return an array of 20 or less articles', async () => {
      const articles = [{ title: 'article 1' }, { title: 'article 2' }];
      const page = 1;

      repository.find = jest.fn().mockResolvedValue(articles);

      const result = await service.findAll(page);

      expect(result.length).toBeLessThanOrEqual(20);
    });
  });
});
