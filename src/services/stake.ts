import Axios from 'axios';
import { IApiStakeStatistics } from '@/interfaces';

class StakeService {

  public async fetchStakes(): Promise<IApiStakeStatistics> {
    const response = await Axios.get(`${process.env.VUE_APP_STAKE_API_URL}/v1/stats`);

    return response.data;
  }
}

export default new StakeService();