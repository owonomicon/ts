{
  description = "shell environment";

  inputs = {
    # nodejs 20.10
    nixpkgs.url = "github:nixos/nixpkgs/120a67bbfa93d9fd830310344cae0291068318bd";
  };

  outputs = { self, nixpkgs }:
    let 
      systems = [ "aarch64-darwin" "aarch64-linux" "x86_64-darwin" "x86_64-linux" ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f (import nixpkgs { inherit system;
        overlays = [
          (final: prev: { nodejs = prev.pkgs.nodejs_20; })
        ];
      }));
    in {
      devShells = forAllSystems (pkgs: {
        default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs
            nodePackages.pnpm
          ];
        };
      });
    };
}
