import { useMutation, useQuery } from '@tanstack/react-query';
import { AppConfigurationService } from '../services';

export const useAppConfigurationAPI = () => {
  const appCfg = useQuery({
    queryFn: () => AppConfigurationService.getAppConfiguration(),
    queryKey: ['appCfg'],
    select: ({ data }) => data,
  });

  const sendHelpMessage = useMutation({
    mutationKey: ['sendMessage'],
    mutationFn: AppConfigurationService.sendHelpMessage,
  });

  return { appCfg, sendHelpMessage };
};
