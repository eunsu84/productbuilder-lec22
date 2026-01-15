{ pkgs, ... }: {
  # 사용할 채널 설정
  channel = "stable-24.05";

  # 웹 개발에 필요한 도구 설치
  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages.live-server
  ];

  # IDX 설정
  idx = {
    # 확장 프로그램 설치
    extensions = [
      "ritwickdey.LiveServer"
    ];

    # 미리보기 설정
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npx" "live-server" "--port=$PORT" "--host=0.0.0.0" "--no-browser"];
          manager = "web";
        };
      };
    };
  };
}