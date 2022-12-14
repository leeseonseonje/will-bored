import {Test, TestingModule} from "@nestjs/testing";
import {RecommendTodoApi} from "../../../src/activity/api/RecommendTodoApi";
import {RequestActivityDto} from "../../../src/activity/RequestActivityDto";
import {ActivityType} from "../../../src/activity/ActivityType";
import {HttpModule} from "@nestjs/axios";
import {BadRequestException} from "@nestjs/common";

describe('RecommendTodoApi', () => {

  let api: RecommendTodoApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [RecommendTodoApi]
    }).compile();

    api = module.get<RecommendTodoApi>(RecommendTodoApi);
  });

  it('apiCall', async () => {
    const activityDto = new RequestActivityDto(ActivityType.EDUCATION, 1);
    let result = await api.apiCall(activityDto);
    expect(result.type).toBe("education");
    expect(result.participants).toBe(1);
  });

  it('apiError', async () => {
    const activityDto = new RequestActivityDto(ActivityType.EDUCATION, 1000);
    await expect(async () => await api.apiCall(activityDto))
      .rejects.toThrowError(BadRequestException);
  });
});