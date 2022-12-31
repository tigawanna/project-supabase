
import { useQuery } from '@tanstack/react-query';

export const useRQSupabaseAPI=<T>(
    
)=>{
return useQuery<T[],unknown,T[],string[]>([]);
}


export const useRQSupabaseRPC = <T>() => {
  return useQuery<T[], unknown, T[], string[]>(
    []
  );
};



